const { user } = require("../../models");

const UserAuthDal = {

  GetAllUsers: async (query, params,pagination) => {
    const {offset,sortObject,pageSize} = pagination;
    return await user.find(query).select(params).sort(sortObject).skip(offset)
    .populate({path:"corporate", select :"name"})
    .limit(Number(pageSize)).lean();
  },

  GetUser: async (query, params) =>await user.findOne(query).select(params).lean(),
  
  GetCount: async (query, params) =>await user.findOne(query).select(params).countDocuments(),

  CreateUser: async (query) => await user.create(query),

  UpdateUser: async (filter,update) => await user.updateOne(filter,update),

  DeleteUser: async (query) => await user.findByIdAndDelete(query),
};

module.exports = UserAuthDal;
