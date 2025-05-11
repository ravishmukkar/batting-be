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
    const data = await AdminService.EditPrivilege(req.body,req.params.designation_id,Number(req.params.module_id));
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },

  EditAdminStatus: async (req, res) => {
    const data = await AdminService.EditAdminStatus(req.params.id,req.params.is_active);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },
  EditAdminType: async (req, res) => {
    console.log(req)
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
};

module.exports = AdminController;
