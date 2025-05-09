const { AdminService } = require("../../service");
const { StatusCodes } = require("http-status-codes");
const { CONSTANTS_MESSAGES } = require("../../Helper");
const { ResponseHandler, CreateAuditTrail } = require("../../Utils");
const { CONSTANTS } = require("../../Constant/");

const DesigController = {

  GetAll: async (req, res) => {
    const data = await AdminService.GetAllDesig(req.query);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },

  Add: async (req, res) => {
    const data = await AdminService.AddDesig(req.body);
    await CreateAuditTrail(req,data,CONSTANTS.PRIVILEGE.PROGRAMME.ADMIN.DESIGNATION.value);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },

  Edit: async (req, res) => {
    const data = await AdminService.EditDesig(req.body,req.params.id);
    await CreateAuditTrail(req,data,CONSTANTS.PRIVILEGE.PROGRAMME.ADMIN.DESIGNATION.value);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },

  Delete: async (req, res) => {
    const data = await AdminService.DeleteDesig(req.params.id);
    await CreateAuditTrail(req,data,CONSTANTS.PRIVILEGE.PROGRAMME.ADMIN.DESIGNATION.value);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },
 
};

module.exports = DesigController;
