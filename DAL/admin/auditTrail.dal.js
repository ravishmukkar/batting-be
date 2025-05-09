const { adminAuditTrails, generalUsersAuditTrails } = require("../../models");

const AuditTrailDal = {
  GetAllAdminAuditTrail: async (query, params,pagination) => {
    const {offset,sortObject,pageSize} = pagination;
    return await adminAuditTrails.find(query).select(params).populate("user_id","_id name").sort(sortObject).skip(offset).limit(Number(pageSize));
  },
  GetAllGeneralUsersAuditTrail: async (query, params,pagination) => {
    const {offset,sortObject,pageSize} = pagination;
    return await generalUsersAuditTrails.find(query).select(params).populate("user_id","_id name").sort(sortObject).skip(offset).limit(Number(pageSize));
  },
  GetAdminRecordCount : async(query)=> await adminAuditTrails.find(query).countDocuments(),
  GetGeneralUsersRecordCount : async(query)=> await generalUsersAuditTrails.find(query).countDocuments(),
  CreateAdminAuditTrail: async (query) => await adminAuditTrails.create(query),
  CreateGeneralUserAuditTrail: async (query) => await generalUsersAuditTrails.create(query),
};

module.exports = AuditTrailDal;
