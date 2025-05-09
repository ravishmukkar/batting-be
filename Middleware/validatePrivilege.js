const jwt = require("jsonwebtoken");
const config = require("../Config");
const { CONSTANTS_MESSAGES } = require("../Helper");
const { StatusCodes } = require("http-status-codes");
const { PrivilegeDal } = require("../DAL");
const { ApiError } = require("../Utils");

const validatePrivilege = (program_id, requestType) => async (req, res, next) => {
  try {
    const {_id} = req.admin;

    const Permissions = await PrivilegeDal.GetIndividualPrivilege({ user_id:_id, program_id: program_id });
    
    if (!Permissions || !Permissions[requestType]) {
      throw new ApiError(CONSTANTS_MESSAGES.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
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
