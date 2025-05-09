const DesigController = require("./admin/designation.controller");
const AdminAuthController = require("./admin/auth.controller");
const UserAuthController = require("./user/auth.controller");
const UserController = require("./user/user.controller");
const AdminController = require("./admin/admin.controller");


module.exports = { 
    AdminAuthController,
    DesigController,
    UserAuthController,
    UserController,
    AdminController,
 };
