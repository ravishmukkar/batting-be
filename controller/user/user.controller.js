const { UserService } = require("../../service");
const { StatusCodes } = require("http-status-codes");
const { CONSTANTS_MESSAGES } = require("../../Helper");
const { ResponseHandler } = require("../../Utils");
const UserController = {

    AddMember: async (req, res) => {
        const { _id } = req.user;
        const data = await UserService.AddMember(_id, req.body);
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
    },

    GetMembers: async (req, res) => {
        const { _id } = req.user;
        const data = await UserService.GetMembers(_id);
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
    },

    UpdateMember: async (req, res) => {
        const { _id } = req.user
        const data = await UserService.UpdateMember(_id,req.body);
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
    },

    DeleteMember: async (req, res) => {
        const { _id } = req.user
        const data = await UserService.DeleteMember(_id, req.query);
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
    },

    UploadFile: async (req, res) => {
        const data = await UserService.UploadFile(req.user._id, req.files)
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);  
    },

    AddHealthTest: async (req, res) => {
        const { _id, unique_id } = req.user
        const data = await UserService.AddHealthTest(_id, unique_id, req.body)
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);  
    },

    GetHealthTests: async (req, res) => {
        const { _id } = req.user
        const data = await UserService.GetHealthTests(_id, req.query)
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);  
    },

    AddClaim: async (req, res) => {
        const { _id, unique_id } = req.user
        const data = await UserService.AddClaim(_id, unique_id, req.body)
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);  
    },

    EditClaim: async (req, res) => {
        const data = await UserService.EditClaim( req.params.id, req.body ) 
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);  
    },

    RaiseClaimDispute: async (req, res) => {
        const data = await UserService.RaiseClaimDispute( req.params.id, req.body ) 
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);  
    },

    GetDisputedClaims: async (req, res) => {
        const { _id } = req.user
        const data = await UserService.GetDisputedClaims(_id, req.query)
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);  
    },

    GetDisputedClaim: async (req, res) => {
        const { _id } = req.user
        const data = await UserService.GetDisputedClaim(_id, req.params.id)
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);  
    },

    GetClaims: async (req, res) => {
        const { _id } = req.user
        const data = await UserService.GetClaims(_id, req.query)
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);  
    },

    GetClaim: async (req, res) => {
        const { _id } = req.user
        const data = await UserService.GetClaim(_id, req.query.id)
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);  
    },
    
    GetCouponDiscount: async (req, res) => {
        const data = await UserService.GetCouponDiscount(req.user._id,req.query);
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);  
    },

    GetCouponDiscountPlanUpgrade: async (req, res) => {
        const data = await UserService.GetCouponDiscountPlanUpgrade(req.user._id,req.query);
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);  
    },

    GetCouponDiscountPlanRenew: async (req, res) => {
        const data = await UserService.GetCouponDiscountPlanRenew(req.user._id,req.query);
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);  
    },
    
    GetClaimCalculation: async (req, res) => {
        const data = await UserService.GetClaimCalculation( Number(req.query.amount), Number(req.query.parameter), req.user );
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
    },

    GetSubscribedPlan: async (req, res) => {
        const data = await UserService.GetSubscribedPlan( req.user.plan );
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
    },
    GetClaimCalculation: async (req, res) => {
        const data = await UserService.GetClaimCalculation( Number(req.query.amount), Number(req.query.parameter), req.user );
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
    },

    CreateOrder: async (req, res) => {
        const data = await UserService.CreateOrder( req.body, req.user._id );
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
    },

    CreateUpgradePlanOrder: async (req, res) => {
        const data = await UserService.CreateUpgradePlanOrder( req.body, req.user._id );
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
    },

    CreateRenewPlanOrder: async (req, res) => {
        const data = await UserService.CreateRenewPlanOrder( req.body, req.user._id );
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
    },

    VerifyPayment: async (req, res) => {
        const data = await UserService.VerifyPayment( req.body, req.user._id );
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
    },

    VerifyPlanUpgradePayment: async (req, res) => {
        const data = await UserService.VerifyPlanUpgradePayment( req.body, req.user._id );
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
    },

    VerifyPlanRenewPayment: async (req, res) => {
        const data = await UserService.VerifyPlanRenewPayment( req.body, req.user._id );
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
    },

    ReferUser: async (req, res) => {
        const data = await UserService.AddReferUsers( req.user._id, req.body );
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
    },

    GetWalletTransactions: async (req, res) => {
        const data = await UserService.GetWalletTransactions(req.user._id)
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
    },

    GetQueuedPlans: async (req, res) => {
        const data = await UserService.GetQueuedPlans(req.user._id,req.query)
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
    },

    GetUpgradePlans: async (req, res) => {
        const data = await UserService.GetUpgradePlans(req.user,req.query)
        ResponseHandler(res, StatusCodes.OK, data, true, CONSTANTS_MESSAGES.SUCCESS);
    },

   
};

module.exports = UserController;
