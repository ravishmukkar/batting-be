const { TokenActions } = require("../DAL");

const TokenServices = {
  SaveToken: TokenActions.saveToken,

  GetUserForToken: TokenActions.getUserForToken,

  FindOneByToken: TokenActions.findOneByToken,

  DeleteByToken: TokenActions.deleteTokenById,

  VerifyUserAccountBasedOnToken: async (token, userType) => {
    const [userDetails] = await TokenActions.getUserForToken(token, userType);
    if (!userDetails) {
      return true
    }
    await TokenActions.deleteTokenById(userDetails.tokenId);
  },
};

module.exports = TokenServices;