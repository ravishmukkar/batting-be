const jwt = require("jsonwebtoken");
const config = require("../Config");

const JwtSign = async (data) => {
  const token = await jwt.sign(data, config.JWT_PRIVATE_KEY, {
    expiresIn: config.JWT_TOKEN_VALIDITY,
  });

  return token;
};

module.exports = JwtSign;
