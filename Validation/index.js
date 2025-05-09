const AdminAuthSchema = require("./admin.auth");
const CommonSchema = require("./common");
const UserAuthSchema = require("./user/user.auth");
const UserSchema = require("./user/user");
const AdminSchema = require("./admin/admin");
const EmailSchema = require("./admin.email");

module.exports = {
    AdminAuthSchema,
    CommonSchema,
    UserAuthSchema,
    UserSchema,
    AdminSchema,
    EmailSchema,
};