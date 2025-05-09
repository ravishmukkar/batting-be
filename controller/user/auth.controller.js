const { UserService } = require("../../service");
const { StatusCodes } = require("http-status-codes");
const { CONSTANTS_MESSAGES } = require("../../Helper");
const { ResponseHandler } = require("../../Utils");
const { CONSTANTS } = require("../../Constant");
const UserAuthController = {
  
  Login: async (req, res) => {
    const body = req.body;
    const data = await UserService.Login(body);
    res.header("Authorization", `Bearer ${data.token}`);
    res.header("user_id",data.user_id);
    res.header("role",CONSTANTS.USER_ROLES.GENERAL_USER);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },

  SignUp: async (req, res) => {
    const body = req.body;
    const data = await UserService.SignUp(body);
    res.header("Authorization", `Bearer ${data.token}`);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },

  Logout: async (req, res) => {
    const data = await UserService.Logout(req.token, req.user._id);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },

  GetProfile: async (req, res) => {
    const { _id } = req.user
    const data = await UserService.GetProfile(_id);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },

  UpdateProfile: async (req, res) => {
    const { _id } = req.user
    const data = await UserService.UpdateProfile(_id, req.body, req.token);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },

  ForgotPassword: async(req, res) => {
    const email = req.body;
    const data = await UserService.ForgotPassword(email);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.FORGOT_PASSWORD);
  },

  UpdatePassword: async(req, res) => {
    const data = await UserService.UpdatePassword(req.body);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
  },

  ResetPassword: async(req,res) => {
    const data = await UserService.ResetPassword(req.user._id,req.body.password);
    ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
}

};

module.exports = UserAuthController;
