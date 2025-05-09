const jwt = require("jsonwebtoken");
const config = require("../Config");
const { CONSTANTS_MESSAGES } = require("../Helper");
const { StatusCodes } = require("http-status-codes");
const { UserAuthDal } = require("../DAL");
const { ApiError } = require("../Utils");

const UserAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
      throw new ApiError(CONSTANTS_MESSAGES.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
    }
    const tokenValue = token.split(' ')[1];
    const decodedToken = await new Promise((resolve, reject) => {
      jwt.verify(tokenValue, config.JWT_PRIVATE_KEY, (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    });
    const { _id } = decodedToken;
    const user = await UserAuthDal.GetUser({ _id });

    if (!user) {
      throw new ApiError(CONSTANTS_MESSAGES.USER_NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    if (!user.token.includes(tokenValue)) {
      throw new ApiError(CONSTANTS_MESSAGES.INVALID_TOKEN, StatusCodes.UNAUTHORIZED);
    }

    // If everything is valid, attach token and user to request object
    req.token = tokenValue;
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in UserAuth middleware:", error);
    res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

module.exports = UserAuth;
