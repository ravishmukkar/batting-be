const AdminAuthDal = require("./admin/auth.dal");
const TokenActions = require("./token.dal");
const PrivilegeDal = require("./admin/privilege.dal");
const EmailDal = require("./admin/email.dal");
const DesigDal = require("./admin/desig.dal");
const AuditTrail = require("./admin/auditTrail.dal");
const VendorDal = require("./admin/vendor.dal")
const CategoryDal = require('./admin/category.dal')
const EventDal = require('./admin/event.dal')

module.exports = {
    AdminAuthDal,
    PrivilegeDal,
    EmailDal,
    TokenActions,
    DesigDal,
    AuditTrail,
    VendorDal,
    CategoryDal,
    EventDal
};
