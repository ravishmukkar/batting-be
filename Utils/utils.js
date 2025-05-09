const sendMail = require("./SendMail")
const axios = require("axios")
const { EmailTemplate } = require("../Helper")
const { v4: uuidv4 } = require("uuid")
const { ManagementUserDal, DesigDal, UserAuthDal, CouponUsagesDal, CouponDal, CorpoDal } = require("../DAL");
const { CONSTANTS } = require("../Constant");
const config = require("../Config");
const { CONSTANTS_MESSAGES } = require("../Helper");
const ApiError = require("./ErrorHandler");
const { claimApproval, claimClarification, claimUpdation } = require("../Helper/email.template");
const dayjs = require("dayjs");
const bcrypt = require("bcrypt");
const { ObjectId } = require('mongodb');
const {StatusCodes} = require("http-status-codes");
const Utils = {
    sendMail: {
        SignUp: async (data) => {
            const msg = EmailTemplate.SignUp(data)
            return sendMail(msg)
        },

        ForgotPassword: async (data) => {
            const msg = EmailTemplate.ForgotPassword(data)
            return sendMail(msg)
        },

        ClaimSubmission : async (data) => {
            const msg = EmailTemplate.ClaimSubmission(data)
            return sendMail(msg)
        },

        ClaimUpdation : async (data) => {
            const msg = EmailTemplate.ClaimUpdation(data)
            return sendMail(msg)
        },

        ClaimApproval : async (data) => {
            const msg = EmailTemplate.ClaimApproval(data)
            return sendMail(msg)
        },

        ClaimRejection : async (data) => {
            const msg = EmailTemplate.ClaimRejection(data)
            return sendMail(msg)
        },

        ClaimClarification : async (data) => {
            const msg = EmailTemplate.ClaimClarification(data)
            return sendMail(msg)
        },
        ClaimInvalid : async (data) => {
          const msg = EmailTemplate.ClaimInvalid(data)
          return sendMail(msg)
        },
        PlanPurchase : async (data) => {
          const msg = EmailTemplate.PlanPurchase(data)
          return sendMail(msg)
        },
    },

    generateRandomToken: async () => { return uuidv4() },

  
    GenerateHashedPassword : async (password) => {
      try{
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password,salt);
      }
      catch (error) {
        return null;
      }
    },

    CalculateDiscount : (discount_type,discount,price) => {
      if (discount_type === CONSTANTS.COUPON_DISC_TYPE.AMOUNT) {
       return  ( price - discount );
      } else {
        return ((price * discount) / 100);
      }
    },

    VerifyCoupon : async (coupon_code, user, price) => {
        let calculatedDiscount = 0;
        if(coupon_code == null ) throw new ApiError(CONSTANTS_MESSAGES.INVALID_COUPON_CODE, StatusCodes.BAD_REQUEST);
        let coupon = await CouponDal.GetCoupon({coupon_code: coupon_code.toLowerCase()});
        if( coupon == null ) throw new ApiError(CONSTANTS_MESSAGES.INVALID_COUPON_CODE, StatusCodes.BAD_REQUEST);
        const { discount_type, discount, coupon_type, end_date,corporate,usage_type,usage } = coupon;
       
        if ((dayjs(end_date)).isBefore(dayjs())) throw new ApiError(CONSTANTS_MESSAGES.EXPIRED_COUPON_CODE, StatusCodes.BAD_REQUEST);
        
        if(user.subscriber_type === CONSTANTS.SUBSCRIBER_TYPE.INDIVIDUAL && coupon_type === CONSTANTS.COUPON_TYPE.CORPORATE){
          throw new ApiError(CONSTANTS_MESSAGES.NOT_VALID_FOR_RETAIL_USERS, StatusCodes.BAD_REQUEST);
        }
        if(user.subscriber_type === CONSTANTS.SUBSCRIBER_TYPE.CORPORATE && coupon_type === CONSTANTS.COUPON_TYPE.INDIVIDUAL){
          throw new ApiError(CONSTANTS_MESSAGES.NOT_VALID_FOR_CORPORATE_USERS, StatusCodes.BAD_REQUEST);
        }

        if(usage_type===CONSTANTS.COUPON_USAGE_TYPE.SINGLE){
          const timesConsumed = await CouponUsagesDal.GetRecordCount({ user:user._id, coupon:coupon._id });
         
          if(timesConsumed) throw new ApiError(CONSTANTS_MESSAGES.COUPON_ALREADY_USED, StatusCodes.BAD_REQUEST);
         
          if(user.subscriber_type === CONSTANTS.SUBSCRIBER_TYPE.INDIVIDUAL){
            calculatedDiscount = Utils.CalculateDiscount(discount_type,discount,price);
          }else{
            if(!corporate.equals(user.corporate))  throw new ApiError(CONSTANTS_MESSAGES.NOT_VALID_FOR_THIS_CORPORATE, StatusCodes.BAD_REQUEST);
            
            calculatedDiscount = Utils.CalculateDiscount(discount_type,discount,price);
          }
        }else{
          const timesConsumed = await CouponUsagesDal.GetRecordCount({ user:user._id, coupon:coupon._id });
         
          if(timesConsumed>=usage) throw new ApiError(CONSTANTS_MESSAGES.EXCEEDED_MAX_ALLOWED_USAGE, StatusCodes.BAD_REQUEST);

          if(user.subscriber_type === CONSTANTS.SUBSCRIBER_TYPE.INDIVIDUAL){
            calculatedDiscount = Utils.CalculateDiscount(discount_type,discount,price);
          }else{
            if(!corporate.equals(user.corporate))  throw new ApiError(CONSTANTS_MESSAGES.NOT_VALID_FOR_THIS_CORPORATE, StatusCodes.BAD_REQUEST);
            
            calculatedDiscount = Utils.CalculateDiscount(discount_type,discount,price);
          }

        }
        return calculatedDiscount;
    },

    CreateCouponConsumption: async (coupon_id, user_id, plan_id, health_plan_id,amount,discount) => {
      await CouponUsagesDal.CreateCouponUsage({
        coupon: coupon_id,
        user: user_id,
        plan: plan_id,
        health_plan: health_plan_id,
        amount,
        discount
      })
    }
}

module.exports = Utils