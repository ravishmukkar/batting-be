const { CONSTANTS_MESSAGES } = require("../Helper");
const { StatusCodes } = require("http-status-codes");
const { ApiError } = require("../Utils");
const { CONSTANTS } = require("../Constant");

const AdminAuthorization = (req, res, next) => {
  try {
    const { admin } = req 
    if (admin.admin_type != CONSTANTS.ADMIN_TYPE.ADMIN) {
      throw new ApiError(CONSTANTS_MESSAGES.UNAUTHORIZED, StatusCodes.UNAUTHORIZED)
    }
  } catch (error) {
    console.log("Error => ", error)
    res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};
module.exports = AdminAuthorization;
