const { adminDetails } = require("../../models");

const AdminAuthDal = {
  GetAdmin: async (query, params) => await adminDetails.findOne(query).select(params),
  
  GetAllAdmin: async (query, params) => await adminDetails.find().select(),
  GetAllAdmins: async (query, params,pagination) => {
    const {offset,sortObject,pageSize} = pagination;
    return await adminDetails.find(query).select(params).sort(sortObject).skip(offset).limit(Number(pageSize));
  },
  CreateAdmin: async (query) => await adminDetails.create(query),

  GetRecordCount : async(query)=> await adminDetails.find(query).countDocuments(),

  UpdateAdmin: async (filter,update) => await adminDetails.updateOne(filter,update),
  UpdateAdminProfile: async (filter,update) => await adminDetails.updateOne(filter,update),

  DeleteAdmin: async (query) => await adminDetails.findOneAndDelete(query),
  BulkDeleteAdmin: async (ids) => {
    return await adminDetails.deleteMany({ _id: { $in: ids } });
  },
  EditAdminStatus: async (filter,update) => await adminDetails.updateOne(filter,update),
  EditAdminType: async (filter,update) => await adminDetails.updateOne(filter,update),


};

module.exports = AdminAuthDal;