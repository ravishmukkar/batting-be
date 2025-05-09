const { ResponseHandler } = require("../Utils");
const { StatusCodes } = require("http-status-codes");

const ValidateRequest = (schema, property) => {
  return (req, res, next) => {
    let { error } = schema.validate(req[property]);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      console.log("error ==>", message);
      ResponseHandler(
        res,
        StatusCodes.UNPROCESSABLE_ENTITY,
        {},
        false,
        message
      );
    }
  };
};

module.exports = ValidateRequest;
