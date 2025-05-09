const { privileges } = require("../../models");

const PrivilegeDal = {

  GetAllPrivilege: async (query, params,pagination) => {
    return await privileges.find(query).select(params);
  },

  GetIndividualPrivilege: async (query, params,pagination) => await privileges.findOne(query).select(params).populate(),

  CheckUniqueRegNo : async(query) => await privileges.findOne(query),

  GetRecordCount : async(query)=> await privileges.find(query).countDocuments(),

  CreatePrivilege: async (query) => await privileges.insertMany(query),

  EditBulkPrivilege : async (update) => await privileges.bulkWrite(update),

};

module.exports = PrivilegeDal;