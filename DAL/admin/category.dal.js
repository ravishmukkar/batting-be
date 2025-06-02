const Category = require("../../models/category.model")
const CategoryDal = {
  GetCategory: async (query, params) => await Category.findOne(query).select(params),
  GetAllCategory: async (query, params,pagination) => {
    const {offset,sortObject,pageSize} = pagination;
    return await Category.find(query).select(params).sort(sortObject).skip(offset).limit(Number(pageSize));
  },
  CreateCategory: async (query) => await Category.create(query),

  GetRecordCount : async(query)=> await Category.find(query).countDocuments(),

  UpdateCategory: async (filter,update) => await Category.updateOne(filter,update),

  DeleteCategory: async (query) => await Category.findOneAndDelete(query),
  BulkDeleteCategory: async (ids) => {
    return await Category.deleteMany({ _id: { $in: ids } });
  },
  EditCategoryStatus: async (filter,update) => await Category.updateOne(filter,update),

};

module.exports = CategoryDal;