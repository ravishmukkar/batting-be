const Tokens = require("../models/token.model");
const TokenActions = {
  saveToken: (data) =>{ return new Tokens(data).save()},

  deleteTokenById: (query) => Tokens.findOneAndDelete(query),

  getUserForToken: async (query) => Tokens.findOne(query),

  findOneByToken: (token) => Tokens.findOne({token:token}),
};

module.exports = TokenActions;