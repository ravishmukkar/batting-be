const { designations } = require("../../models");

const DesigDal = {
  GetAllDesig: async (query, params,pagination) => {
    const {offset,sortObject,pageSize} = pagination;
    return await designations.find(query).select(params).sort(sortObject).skip(offset).limit(Number(pageSize));
  },
  CheckUniqueDesignation : async (query) => await designations.findOne(query),
  GetRecordCount : async(query)=> await designations.find(query).countDocuments(),
  CreateDesig: async (query) => await designations.create(query),
  EditDesig: async (filter,update) => await designations.findOneAndUpdate(filter,update),
  DeleteDesig: async (query) => await designations.findOneAndDelete(query),
  BulkDeleteDesignations: async (ids) => {
    return await designations.deleteMany({ _id: { $in: ids } });
  }

};

module.exports = DesigDal;
