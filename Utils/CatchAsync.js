const ResponseHandler = require("./ResponseHandler");
const ApiError = require("./ErrorHandler")
const { StatusCodes } = require("http-status-codes")
const { CONSTANTS_MESSAGES } = require("../Helper");

const CatchAsync = fn => async (req, res, next) => {
    try {
        await Promise.resolve(fn(req, res, next));
    } catch (err) {
        console.error("Error ==>", err);
        if (err instanceof ApiError) {
            return ResponseHandler(
                res,
                err.status_code,
                [],
                false,
                err.message
            );
        } else {
            return ResponseHandler(
                res,
                StatusCodes.INTERNAL_SERVER_ERROR,
                [],
                false,
                CONSTANTS_MESSAGES.INTERNAL_SERVER_ERROR
            );
        }
    }
}

module.exports = CatchAsync;
