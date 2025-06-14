const jwt = require("jsonwebtoken");
const config = require("../Config");
const { CONSTANTS_MESSAGES } = require("../Helper");
const { StatusCodes } = require("http-status-codes");
const { PrivilegeDal } = require("../DAL");
const { ApiError } = require("../Utils");

const validatePrivilege = (program_id, requestType) => async (req, res, next) => {
  try {
    const {_id} = req.admin;

    if(req.admin.admin_type == 1){
      return next();
    }

   
    const Permissions = await PrivilegeDal.GetIndividualPrivilege({ admin_id:_id, module_id: program_id });
    
    if (!Permissions || !Permissions[requestType]) {
      // throw new ApiError(CONSTANTS_MESSAGES.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
       res.status(StatusCodes.UNAUTHORIZED|| StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: CONSTANTS_MESSAGES.UNAUTHORIZED || CONSTANTS_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    } else {
      console.log("Permission granted");
      next(); 
    }
  } catch (error) {
    console.error("Error occurred in checking privileges:", error);
    // res.status(error.status_code || StatusCodes.INTERNAL_SERVER_ERROR ).json({ error: error.message || CONSTANTS_MESSAGES.INTERNAL_SERVER_ERROR});
  }
};

module.exports = validatePrivilege;
