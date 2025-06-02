const adminDetails = require("./adminDetails");
const designations = require("./designation");
const user = require("./user.model");
const privileges = require("./privilege.model");
const email = require("./email");
const adminAuditTrails = require("./adminAuditTrail.model");
const VendorDal = require("./vendor.model")
const Category  = require("./category.model")
const Event = require('./event.model')

module.exports = {
    adminDetails,
    designations,
    user,
    privileges,
    email,
    adminAuditTrails,
    VendorDal,
    Category,
    Event
};
