const bcrypt = require("bcrypt");
const dayjs = require("dayjs");
const { 
  AdminAuthDal, 
  DesigDal, 
  VendorDal,
  PrivilegeDal,
  CategoryDal,
  EventDal
} = require("../../DAL");
const { CONSTANTS_MESSAGES } = require("../../Helper");
const { JwtSign, ApiError, Utils } = require("../../Utils");
const { StatusCodes } = require("http-status-codes");
const { CONSTANTS } = require("../../Constant");
const TokenServices = require("../token.service");
const { createForgotPasswordEmail,createAdminCreateEmail } = require("../../Utils/emailUtils"); 
const sendMail = require("../../Utils/mailer");
const { constants } = require("crypto");

const AdminService = {

  UploadFile: async (_id, files) => {
    const uploadPromises = files.map(async (file) => {
      const token = await Utils.generateRandomToken();
      const fileName = `admin/${token}/${new Date()}${file.originalname}`;
      return Utils.UploadFile(file.buffer, fileName, file.mimetype);
    });
    return await Promise.all(uploadPromises);
  },

  Login: async (data) => {
    const { email, password } = data;

    const existingUser = await AdminAuthDal.GetAdmin(
      { email },
      "_id email password token admin_type status"
    );
    if (!existingUser) {
      throw new ApiError(
        CONSTANTS_MESSAGES.ADMIN_NOT_FOUND,
        StatusCodes.NOT_FOUND
      );
    }
    if (existingUser.status === CONSTANTS.STATUS.INACTIVE) {
      throw new ApiError(CONSTANTS_MESSAGES.ADMIN_INACTIVE, StatusCodes.UNAUTHORIZED);
    }


    const matched = await bcrypt.compare(password, existingUser.password);

    if (!matched) {
      throw new ApiError(
        CONSTANTS_MESSAGES.WRONG_PASSWORD,
        StatusCodes.BAD_REQUEST
      );
    }
    const token = await JwtSign({
      email: existingUser.email,
      _id: existingUser._id,
      admin_type: existingUser.admin_type
    });

    existingUser.token.push(token);
    existingUser.last_login = new Date();
    await AdminAuthDal.UpdateAdmin({ _id: existingUser._id }, existingUser);

    return {token: token,_id:existingUser._id, role: existingUser.admin_type };
  },

  Logout: async (token, _id) => {
    const user = await AdminAuthDal.GetAdmin(_id);
    // await AdminAuthDal.UpdateAdmin({ _id }, { $pull: { token: [] } }); /** It is usefull for multiple users login same time */
    await AdminAuthDal.UpdateAdmin({ _id }, { $set: { token: [] } });
    return {}
  },

  ForgotPassword: async (data) => {
    const { email, phone } = data;
    let projection = {};

  
    if (email && phone) {
      projection = { $or: [{ email }, { phone }] };
    } else if (email) {
      projection = { email };
    } else if (phone) {
      projection = { phone };
    }


    const user = await AdminAuthDal.GetAdmin(projection);
    if (!user) {
      throw new ApiError(CONSTANTS_MESSAGES.USER_NOT_FOUND, StatusCodes.NOT_FOUND);
    }
  
    const token = await Utils.generateRandomToken(user.email);
    const forgotPasswordUser = {
      userId: user._id,
      token: token,
    };
  
    await TokenServices.SaveToken(forgotPasswordUser);
  
    const resetLink = `http://localhost:3000/admin/reset_password?token=${token}`;
    const emailHtml = createForgotPasswordEmail(user.name || "User", resetLink);
  
    await sendMail(user.email, "Password Reset Request", emailHtml);
  
    console.log("Password reset email sent to:", user.email);
    console.log("Reset link:", resetLink);
  
    return { message: "Password reset email sent." };
  },

  UpdatePassword: async (token,password) => {
    
    const tokenExist = await TokenServices.GetUserForToken({token})
    if (!tokenExist) {
      throw new ApiError(CONSTANTS_MESSAGES.TOKEN_NOT_FOUND, StatusCodes.NOT_FOUND)
    }
    const _id = tokenExist.userId
    const user = await AdminAuthDal.GetAdmin(_id)
    const matched = await bcrypt.compare(password, user.password);
    if (matched){
      throw new ApiError(CONSTANTS_MESSAGES.OLD_NEW_PASSWORD_ERROR, StatusCodes.CONFLICT)
    }
    password = await bcrypt.hash(password, 10);
    await AdminAuthDal.UpdateAdmin({_id}, { password: password, token: [] })
    await TokenServices.DeleteByToken({token})
    return {}
  },


  ResetPassword: async (_id,password) => {
    const validUser = await AdminAuthDal.GetAdmin({ _id });
    if(validUser == null) throw new ApiError(CONSTANTS_MESSAGES.USER_NOT_FOUND, StatusCodes.NOT_FOUND);
    const hashedPassword = await Utils.GenerateHashedPassword(password);
    await AdminAuthDal.UpdateUser({ _id },{ password:hashedPassword, reset_default_password:1 });
    return {};
  },

  GetProfile: async (_id) => {
    const existingUser = await AdminAuthDal.GetAdmin({ _id }, "_id name email phone designation country_code profile_image admin_type");
    if (!existingUser) {
        throw new ApiError(CONSTANTS_MESSAGES.USER_NOT_FOUND, StatusCodes.NOT_FOUND);
    }
    return existingUser;
  },

  EditProfile: async (_id, body) => {
    const existingUser = await AdminAuthDal.GetAdmin({ _id }, "_id");
    
    if (!existingUser) {
      throw new ApiError(CONSTANTS_MESSAGES.USER_NOT_FOUND, StatusCodes.NOT_FOUND);
    }


    const updatedUser = await AdminAuthDal.UpdateAdmin({_id}, body);
    return updatedUser;
  },

  SignUp: async (data) => {
    const { email, password, admin_type = CONSTANTS.ADMIN_TYPE.ADMIN, name, phone, country_code,designation_id } = data;

    const existingUser = await AdminAuthDal.GetAdmin({ email }, "_id token");
    if (existingUser) throw new ApiError(CONSTANTS_MESSAGES.EMAIL_EXISTS, StatusCodes.CONFLICT);

    const user = await AdminAuthDal.CreateAdmin({ email, password, admin_type, name, phone, country_code,designation_id });
    // await Utils.sendMail.signup({
    //   name: "Utkarsh Singh Tomar",
    //   email: "ust816@gmail.com",
    // });
    const emailHtml = createAdminCreateEmail(user.name || "User");
    await sendMail(user.email, "Admin Created", emailHtml);

    
    const token = await JwtSign({ email: user.email, _id: user._id });
    user.token.push(token);
    await AdminAuthDal.UpdateAdmin({ _id: user._id }, user);
    return { token, _id: user._id  };
  },

  AddDesig: async (data) => {
    const uniqueDesignation = await DesigDal.CheckUniqueDesignation({designation: data.designation}); 
    if(uniqueDesignation) throw new ApiError(CONSTANTS_MESSAGES.NAME_EXISTS, StatusCodes.BAD_REQUEST);
    const CreateDesig =  await DesigDal.CreateDesig(data);
    const privilige = [
      {  module_id:CONSTANTS.PRIVILEGE.PROGRAMME.ADMIN.DESIGNATION.id,designation_id:CreateDesig._id , GET:0, POST:0, PATCH:0, DELETE:0 },
      {  module_id:CONSTANTS.PRIVILEGE.PROGRAMME.ADMIN.PRIVILEGES.id ,designation_id:CreateDesig._id, GET:0, POST:0, PATCH:0, DELETE:0 },
      {  module_id:CONSTANTS.PRIVILEGE.PROGRAMME.ADMIN.ADMIN.id, designation_id:CreateDesig._id, GET:0, POST:0, PATCH:0, DELETE:0 },
    ]
    console.log(privilige)
    return await PrivilegeDal.CreatePrivilege(privilige);
  },
  GetAllDesig: async (data) => {
    const { search, page=1, pageSize=10, sortBy="createdAt", sortOrder="-1" } = data;
    const offset = (page - 1) * pageSize;
    const sortObject = {};
    let searchQuery;
    if (search) {
      searchQuery = {
        designation: { $regex: search, $options: "i" }
      };
    } else {
      searchQuery = {};
    }
    sortObject[sortBy] = parseInt(sortOrder);
    const pagination = { offset, sortObject, pageSize, searchQuery }
    console.log(searchQuery)
    const resp = await DesigDal.GetAllDesig(searchQuery, "", pagination);
    const totalCount = await DesigDal.GetRecordCount(searchQuery);
    const totalPages = Math.ceil(totalCount / pageSize);
    return {
      records: resp,
      pagination: {
        totalRecords: totalCount,
        pageSize: Number(pageSize),
        totalPages,
        currentPage: Number(page),
        nextPage: Number(page) < totalPages ? Number(page) + 1 : null,
        prevPage: Number(page) > 1 ? Number(page) - 1 : null,
      },
    };
  },

  EditDesig: async (data,_id) => {
    const uniqueDesignation = await DesigDal.CheckUniqueDesignation({designation: data.designation}); 
    if(uniqueDesignation) throw new ApiError(CONSTANTS_MESSAGES.NAME_EXISTS, StatusCodes.BAD_REQUEST);
    return await DesigDal.EditDesig({ _id },data ,{new:false});
  },

  DeleteDesig: async (_id) => await DesigDal.DeleteDesig( {_id, id: null }),
  BulkDeleteDesignations: async (ids) => await DesigDal.BulkDeleteDesignations(ids),

  /** Get All Masters */
  GetAllMasters : () => CONSTANTS.PRIVILEGE.PROGRAMME.ADMIN,


  /** Get all privilege services */
  AddPrivilege: async (data) => {
    const PrivilegeExist = await PrivilegeDal.GetIndividualPrivilege({module_id:data.module_id,designation_id:data.designation_id});
    if (PrivilegeExist) throw new ApiError(CONSTANTS_MESSAGES.PRIVILEGE_EXITS, StatusCodes.CONFLICT);
    return await PrivilegeDal.CreatePrivilege(data);
  },
  
  GetAllPrivilege: async (data) => {  
    const resp = await PrivilegeDal.GetAllPrivilege({ admin_id : data.admin_id });
    return {
      records: resp,     
    };
  },

  GetIndividualPrivilege: async (data) => await PrivilegeDal.GetIndividualPrivilege({ program_id : data.program_id, user_id:data.user_id }),

  EditPrivilege: async (data, admin_id, module_id) => {
    const bulkOps = data.map(update => {
        const filter = { admin_id, module_id:update.module_id };
        const updateData = {
          $set: {
            POST: update.POST,
            PATCH: update.PATCH,
            DELETE: update.DELETE,
            GET: update.GET
          }
        };   
      return {
        updateOne: {
          filter: filter,
          update: updateData,
          upsert: true
        }
      };
    });
  
    console.log(bulkOps)

    try {
      return await PrivilegeDal.EditBulkPrivilege(bulkOps);
    } catch (error) {
      throw new ApiError(CONSTANTS_MESSAGES.PERMISSION_UPDATE_FAILED, StatusCodes.BAD_REQUEST);
    }
  },


  /** admin service */
  GetAllAdmin: async (data) => {
    const { search, page=1, pageSize=10, sortBy="createdAt", sortOrder="-1" } = data;
    const offset = (page - 1) * pageSize;
    const sortObject = {};
    let searchQuery;
    if (search) {
      searchQuery = {
        email: { $regex: search, $options: "i" },
        name: { $regex: search, $options: "i" },
      };
    } else {
      searchQuery = {};
    }
   
    sortObject[sortBy] = parseInt(sortOrder);
    const pagination = { offset, sortObject, pageSize, searchQuery }
    const resp = await AdminAuthDal.GetAllAdmins(searchQuery, "", pagination);
    const totalCount = await AdminAuthDal.GetRecordCount(searchQuery);
    const totalPages = Math.ceil(totalCount / pageSize);
    return {
      records: resp,
      pagination: {
        totalRecords: totalCount,
        pageSize: Number(pageSize),
        totalPages,
        currentPage: Number(page),
        nextPage: Number(page) < totalPages ? Number(page) + 1 : null,
        prevPage: Number(page) > 1 ? Number(page) - 1 : null,
      },
    };
  },

  EditAdmin: async (data,_id) => {
    const findAdmin = await AdminAuthDal.GetAdmin({ _id });
    if(!findAdmin) throw new ApiError(CONSTANTS_MESSAGES.ID_NOT_FOUND, StatusCodes.BAD_REQUEST);
    const findUniqGame = await AdminAuthDal.GetAdmin({ email : data.email , _id : { $ne : _id } });
    if(findUniqGame) throw new ApiError(CONSTANTS_MESSAGES.EMAIL_EXISTS, StatusCodes.BAD_REQUEST);
   
    return await AdminAuthDal.UpdateAdmin({ _id },data ,{new:false});
  },

  DeleteAdmin: async (_id) => await AdminAuthDal.DeleteAdmin( {_id, id: null }),
  BulkDeleteAdmin: async (ids) => await AdminAuthDal.BulkDeleteAdmin(ids),

  EditAdminStatus: async (_id,is_active) => {
    return await AdminAuthDal.EditAdminStatus({ _id },{is_active} ,{new:false});
  },
  EditAdminType: async (_id,admin_type) => {
    return await AdminAuthDal.EditAdminType({ _id },{admin_type} ,{new:false});
  },

  /** vendor service */
  AddVendor: async (data) => {
    const VendorExist = await VendorDal.GetVendor({$or: [
      { username: data.username },
      { email: data.email }
    ]});
    if (VendorExist) throw new ApiError(CONSTANTS_MESSAGES.USER_EXISTS, StatusCodes.CONFLICT);
    return await VendorDal.CreateVendor(data);
  },

  GetAllVendor: async (data) => {
    const { search, page=1, pageSize=10, sortBy="createdAt", sortOrder="-1" } = data;
    const offset = (page - 1) * pageSize;
    const sortObject = {};
    let searchQuery;
    if (search) {
      searchQuery = {
        $or: [
          { email: { $regex: search, $options: "i" },},
          { name: { $regex: search, $options: "i" },},
          { username: { $regex: search, $options: "i" },}
        ]
      };
    } else {
      searchQuery = {};
    }

    sortObject[sortBy] = parseInt(sortOrder);
    const pagination = { offset, sortObject, pageSize }
    const resp = await VendorDal.GetAllVendor(searchQuery, "", pagination);
    const totalCount = await VendorDal.GetRecordCount(searchQuery);
    const totalPages = Math.ceil(totalCount / pageSize);
    return {
      records: resp,
      pagination: {
        totalRecords: totalCount,
        pageSize: Number(pageSize),
        totalPages,
        currentPage: Number(page),
        nextPage: Number(page) < totalPages ? Number(page) + 1 : null,
        prevPage: Number(page) > 1 ? Number(page) - 1 : null,
      },
    };
  },

  EditVendor: async (data,_id) => {
    const findVendor = await VendorDal.GetVendor({ _id });
    if(!findVendor) throw new ApiError(CONSTANTS_MESSAGES.ID_NOT_FOUND, StatusCodes.BAD_REQUEST);
    const findUniqEmail = await VendorDal.GetVendor({ email : data.email , _id : { $ne : _id } });
    if(findUniqEmail) throw new ApiError(CONSTANTS_MESSAGES.EMAIL_EXISTS, StatusCodes.BAD_REQUEST);
    const findUniqUserName = await VendorDal.GetVendor({ username : data.username , _id : { $ne : _id } });
    if(findUniqUserName) throw new ApiError(CONSTANTS_MESSAGES.USER_EXISTS, StatusCodes.BAD_REQUEST);
    return await VendorDal.UpdateVendor({ _id },data ,{new:false});
  },

  DeleteVendor: async (_id) => await VendorDal.DeleteVendor( {_id, id: null }),
  BulkDeleteVendor: async (ids) => await VendorDal.BulkDeleteVendor(ids),

  EditVendorStatus: async (_id,is_active) => {
    return await VendorDal.EditVendorStatus({ _id },{is_active} ,{new:false});
  },
  EditVendorType: async (_id,admin_type) => {
    return await VendorDal.EditVendorType({ _id },{admin_type} ,{new:false});
  },

  /** category service */
  AddCategory: async (data) => {
    const categoryExist = await CategoryDal.GetCategory({$or: [
      { category_name: data.category_name },
    ]});
    if (categoryExist) throw new ApiError(CONSTANTS_MESSAGES.USER_EXISTS, StatusCodes.CONFLICT);
    return await CategoryDal.CreateCategory(data);
  },

  GetAllCategory: async (data) => {
    const { search, page=1, pageSize=10, sortBy="createdAt", sortOrder="-1" } = data;
    const offset = (page - 1) * pageSize;
    const sortObject = {};
    let searchQuery;
    if (search) {
      searchQuery = {
        $or: [
          { category_name: { $regex: search, $options: "i" },},
        ]
      };
    } else {
      searchQuery = {};
    }

    sortObject[sortBy] = parseInt(sortOrder);
    const pagination = { offset, sortObject, pageSize }
    const resp = await CategoryDal.GetAllCategory(searchQuery, "", pagination);
    const totalCount = await CategoryDal.GetRecordCount(searchQuery);
    const totalPages = Math.ceil(totalCount / pageSize);
    return {
      records: resp,
      pagination: {
        totalRecords: totalCount,
        pageSize: Number(pageSize),
        totalPages,
        currentPage: Number(page),
        nextPage: Number(page) < totalPages ? Number(page) + 1 : null,
        prevPage: Number(page) > 1 ? Number(page) - 1 : null,
      },
    };
  },

  EditCategory: async (data,_id) => {
    const findCategory = await CategoryDal.GetCategory({ _id });
    if(!findCategory) throw new ApiError(CONSTANTS_MESSAGES.ID_NOT_FOUND, StatusCodes.BAD_REQUEST);
    const findUniqCategory = await CategoryDal.GetCategory({ category_name : data.category_name , _id : { $ne : _id } });
    if(findUniqCategory) throw new ApiError(CONSTANTS_MESSAGES.EMAIL_EXISTS, StatusCodes.BAD_REQUEST);
   
    return await CategoryDal.UpdateCategory({ _id },data ,{new:false});
  },

  DeleteCategory: async (_id) => await CategoryDal.DeleteCategory( {_id, id: null }),
  BulkDeleteCategory: async (ids) => await CategoryDal.BulkDeleteCategory(ids),

  EditCategoryStatus: async (_id,is_active) => {
    return await CategoryDal.EditCategoryStatus({ _id },{is_active} ,{new:false});
  },

   /** Event service */
  AddEvent: async (data) => {
    const gameExist = await EventDal.GetEvent({$or: [
      { event_name: data.event_name },
    ]});

    if (gameExist) throw new ApiError(CONSTANTS_MESSAGES.USER_EXISTS, StatusCodes.CONFLICT);
    return await EventDal.CreateEvent(data);
  },
  GetAllEvent: async (data) => {
    const { search, page=1, pageSize=10, sortBy="createdAt", sortOrder="-1" } = data;
    const offset = (page - 1) * pageSize;
    const sortObject = {};
    let searchQuery;
    if (search) {
      searchQuery = {
        $or: [
          { event_name : { $regex: search, $options: "i" },},
        ]
      };
    } else {
      searchQuery = {};
    }

    sortObject[sortBy] = parseInt(sortOrder);
    const pagination = { offset, sortObject, pageSize }
    const resp = await EventDal.GetAllEvent(searchQuery, "", pagination);
    const totalCount = await EventDal.GetRecordCount(searchQuery);
    const totalPages = Math.ceil(totalCount / pageSize);
    return {
      records: resp,
      pagination: {
        totalRecords: totalCount,
        pageSize: Number(pageSize),
        totalPages,
        currentPage: Number(page),
        nextPage: Number(page) < totalPages ? Number(page) + 1 : null,
        prevPage: Number(page) > 1 ? Number(page) - 1 : null,
      },
    };
  },
  EditEvent: async (data,_id) => {
    const findGame = await EventDal.GetEvent({ _id });
    if(!findGame) throw new ApiError(CONSTANTS_MESSAGES.ID_NOT_FOUND, StatusCodes.BAD_REQUEST);
    const findUniqGame = await EventDal.GetEvent({ name : data.event_name , _id : { $ne : _id } });
    if(findUniqGame) throw new ApiError(CONSTANTS_MESSAGES.EMAIL_EXISTS, StatusCodes.BAD_REQUEST);
   
    return await EventDal.UpdateEvent({ _id },data ,{new:false});
  },
  DeleteEvent: async (_id) => await EventDal.DeleteEvent( {_id, id: null }),
  BulkDeleteEvent: async (ids) => await EventDal.BulkDeleteEvent(ids),
  EditEventStatus: async (_id,is_active) => {
    return await EventDal.EditEventStatus({ _id },{is_active} ,{new:false});
  },
  
  
};

module.exports = AdminService;
