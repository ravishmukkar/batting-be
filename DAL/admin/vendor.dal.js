const vendor = require("../../models/vendor.model")
const VendorDal = {
  GetVendor: async (query, params) => await vendor.findOne(query).select(params),
  
  // GetAllVendor: async (query, params) => await vendor.find().select(),
  GetAllVendor: async (query, params,pagination) => {
    const {offset,sortObject,pageSize} = pagination;
    return await vendor.find(query).select(params).sort(sortObject).skip(offset).limit(Number(pageSize));
  },
  CreateVendor: async (query) => await vendor.create(query),

  GetRecordCount : async(query)=> await vendor.find(query).countDocuments(),

  UpdateVendor: async (filter,update) => await vendor.updateOne(filter,update),
  UpdateVendorProfile: async (filter,update) => await vendor.updateOne(filter,update),

  DeleteVendor: async (query) => await vendor.findOneAndDelete(query),
  BulkDeleteVendor: async (ids) => {
    return await vendor.deleteMany({ _id: { $in: ids } });
  },
  EditVendorStatus: async (filter,update) => await vendor.updateOne(filter,update),
  EditVendorType: async (filter,update) => await vendor.updateOne(filter,update),

};

module.exports = VendorDal;