const { AdminService } = require("../../service");
const { StatusCodes } = require("http-status-codes");
const { CONSTANTS_MESSAGES } = require("../../Helper");
const { ResponseHandler, CreateAuditTrail } = require("../../Utils");
const { CONSTANTS } = require("../../Constant");

const AdminController = {

  GetAllAdminUsers: async (req, res) => {
    const data = await AdminService.GetAllAdminUsers();
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },
 

  GetAllMasters: async (req, res) => {
    const data = await AdminService.GetAllMasters();
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },
 
  GetAllPrivilege: async (req, res) => {
    const data = await AdminService.GetAllPrivilege(req.params);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },

  GetIndividualPrivilege: async (req, res) => {
    const data = await AdminService.GetIndividualPrivilege(req.params);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },

  AddPrivilege: async (req, res) => {
    const data = await AdminService.AddPrivilege(req.body);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },

  EditPrivilege: async (req, res) => {
    const data = await AdminService.EditPrivilege(req.body,req.params.admin_id,Number(req.params.module_id));
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },

  EditAdminStatus: async (req, res) => {
    const data = await AdminService.EditAdminStatus(req.params.id,req.params.is_active);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },
  EditAdminType: async (req, res) => {
    console.log(req,'dd')
    const data = await AdminService.EditAdminType(req.params.id,req.params.admin_type);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },
  
  GetEmailTemplate: async (req, res) => {
    const data = await AdminService.GetEmail();
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },
  
  EditEmailTemplate: async (req, res) => {
    const data = await AdminService.EditEmail(req.body, req.params.id);
    // await CreateAuditTrail(req,data,CONSTANTS.PRIVILEGE.PROGRAMME.ADMIN.TC);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },

  GetProfile: async (req, res) => {
    const data = await AdminService.GetProfile(req.admin._id);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);  
  },

  EditProfile : async(req,res)=>{
    const data = await AdminService.EditProfile(req.admin._id,req.body);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);  
  },


  UploadFile: async (req, res) => {
    const data = await AdminService.UploadFile(req.admin._id, req.files)
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);  
  },


   AddVendor: async (req, res) => {
    const data = await AdminService.AddVendor(req.body);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },

  /** Get all admin */
  GetAllAdmin: async (req, res) => {
    const data = await AdminService.GetAllAdmin(req.query);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },

  EditAdmin: async (req, res) => {
    const data = await AdminService.EditAdmin(req.body,req.params.id);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },
  DeleteAdmin: async (req, res) => {
    const data = await AdminService.DeleteAdmin(req.params.id);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },
  BulkDeleteAdmin: async (req, res) => {
    const data = await AdminService.BulkDeleteAdmin(req.body.ids);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },

  /** Get all vendor */
  GetAllVendor: async (req, res) => {
    const data = await AdminService.GetAllVendor(req.query);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },
  EditVendor: async (req, res) => {
    const data = await AdminService.EditVendor(req.body,req.params.id);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },
  DeleteVendor: async (req, res) => {
    const data = await AdminService.DeleteVendor(req.params.id);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },
  BulkDeleteVendor: async (req, res) => {
    const data = await AdminService.BulkDeleteVendor(req.body.ids);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },
   EditVendorStatus: async (req, res) => {
    const data = await AdminService.EditVendorStatus(req.params.id,req.params.is_active);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },

  /** Get all category */
  AddCategory: async (req, res) => {
    req.body.created_by = req?.admin?._id
    const data = await AdminService.AddCategory(req.body);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },
  GetAllCategory: async (req, res) => {
    const data = await AdminService.GetAllCategory(req.query);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },
  EditCategory: async (req, res) => {
    const data = await AdminService.EditCategory(req.body,req.params.id);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },
  DeleteCategory: async (req, res) => {
    const data = await AdminService.DeleteCategory(req.params.id);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },
  BulkDeleteCategory: async (req, res) => {
    const data = await AdminService.BulkDeleteCategory(req.body.ids);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },
   EditCategoryStatus: async (req, res) => {
    const data = await AdminService.EditCategoryStatus(req.params.id,req.params.is_active);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },

   /** Get all category */
  AddEvent: async (req, res) => {
    req.body.created_by = req?.admin?._id
    req.body.category_id = "683c0990c9fac4bd78aa360b";
    const data = await AdminService.AddEvent(req.body);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },
  GetAllEvent: async (req, res) => {
    const data = await AdminService.GetAllEvent(req.query);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },
  EditEvent: async (req, res) => {
    const data = await AdminService.EditEvent(req.body,req.params.id);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },
  DeleteEvent: async (req, res) => {
    const data = await AdminService.DeleteEvent(req.params.id);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },
  BulkDeleteEvent: async (req, res) => {
    const data = await AdminService.BulkDeleteEvent(req.body.ids);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },
  EditEventStatus: async (req, res) => {
    const data = await AdminService.EditEventStatus(req.params.id,req.params.is_active);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },
};

module.exports = AdminController;
