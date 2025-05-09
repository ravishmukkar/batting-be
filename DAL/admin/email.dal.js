const { email } = require("../../models");
const EmailDal = {
  GetOneEmail : async (query) => await email.findOne(query),
  EditEmail: async (filter,update) => await email.findOneAndUpdate(filter,update),
};

module.exports = EmailDal;
