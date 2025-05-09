const { adminDetails } = require("../../models");

const AdminAuthDal = {
  GetAdmin: async (query, params) => await adminDetails.findOne(query).select(params),
  
  GetAllAdmin: async (query, params) => await adminDetails.find().select(),
  
  CreateAdmin: async (query) => await adminDetails.create(query),

  UpdateAdmin: async (filter,update) => await adminDetails.updateOne(filter,update),
  UpdateAdminProfile: async (filter,update) => await adminDetails.updateOne(filter,update),
};

module.exports = AdminAuthDal;