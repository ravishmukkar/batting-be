const Joi = require("joi");

const EmailSchema = {

    Edit: Joi.object().keys({      
        registration: Joi.string().max(5000).required(), 
        plan_purchase_mail: Joi.string().max(5000).required(),
        hc_plan_purchase_mail: Joi.string().max(5000).required(),
        plan_expiry_mail: Joi.string().max(5000).required(),
        hc_plan_expiry_mail: Joi.string().max(5000).required(),
        claim_submission_mail: Joi.string().max(5000).required(),
        claim_approval_mail: Joi.string().max(5000).required(),
        claim_rejection_mail: Joi.string().max(5000).required(),
        claim_clarification_mail: Joi.string().max(5000).required(),
        claim_updation_mail: Joi.string().max(5000).required(),
        claim_invalid_mail: Joi.string().max(5000).required(),
    }),

}

module.exports = EmailSchema;