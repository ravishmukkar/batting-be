const AdminAuthDal = require("./admin/auth.dal");
const TokenActions = require("./token.dal");
const PrivilegeDal = require("./admin/privilege.dal");
const EmailDal = require("./admin/email.dal");


module.exports = {
    AdminAuthDal,
    PrivilegeDal,
    EmailDal,
    TokenActions
};
