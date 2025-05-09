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
    const data = await AdminService.EditPrivilege(req.body,req.params.user_id,Number(req.params.module_id));
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

   
};

module.exports = AdminController;
