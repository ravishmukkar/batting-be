const Joi = require("joi")
const { CONSTANTS } = require("../Constant")

const AdminAuthSchema = {
    Signup: Joi.object().keys({
        email: Joi.string().email().regex(CONSTANTS.REGEX.EMAIL).required(),
        password: Joi.string().required(),
        confirm_password: Joi.string()
        .valid(Joi.ref('password'))
        .required(),
        name: Joi.string().required(),
        phone: Joi.string().required(),
        country_code: Joi.string().required(),
        designation_id : Joi.string(),
        profile_image : Joi.object().optional()
    }),

    Signin: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    }),

    ForgotPassword: Joi.object().keys({
        key_type: Joi.number().valid(...Object.values(CONSTANTS.KEY_TYPE)).required(),
        email: Joi.when("key_type", {
            is: CONSTANTS.KEY_TYPE.PHONE,
            then: Joi.string().email().optional(),
            otherwise: Joi.string().email().required()
        }),
        phone: Joi.when("key_type", {
            is: CONSTANTS.KEY_TYPE.EMAIL,
            then: Joi.string().optional(),
            otherwise: Joi.string().required()
        }),
        country_code: Joi.when("key_type", {
            is: CONSTANTS.KEY_TYPE.PHONE,
            then: Joi.string().required(),
            otherwise: Joi.string().optional()
        }),
    }),
    
    ResetPassword: Joi.object().keys({
        password: Joi.string().required(),
        confirm_password: Joi.string().required().equal(Joi.ref('password')).messages({
            'any.only': 'Confirm password must match password'
        })
    }),
}

module.exports = AdminAuthSchema