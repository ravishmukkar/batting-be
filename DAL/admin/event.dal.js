const { Event } = require('../../models')
const EventDal = {
  GetEvent: async (query, params) => await Event.findOne(query),
  
  GetAllEvent: async (query, params,pagination) => {
    const {offset,sortObject,pageSize} = pagination;
    return await Event.find(query).select(params).sort(sortObject).skip(offset).limit(Number(pageSize));
  },
  CreateEvent: async (query) => await Event.create(query),

  GetRecordCount : async(query)=> await Event.find(query).countDocuments(),

  UpdateEvent: async (filter,update) => await Event.updateOne(filter,update),

  DeleteEvent: async (query) => await Event.findOneAndDelete(query),
  BulkDeleteEvent: async (ids) => {
    return await Event.deleteMany({ _id: { $in: ids } });
  },
  EditEventStatus: async (filter,update) => await Event.updateOne(filter,update),

};

module.exports = EventDal;