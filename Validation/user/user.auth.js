const Joi = require("joi")
const { CONSTANTS } = require("../../Constant")
const { CONSTANTS_MESSAGES } = require("../../Helper")

const UserAuthSchema = {
    Signup: Joi.object().keys({
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
        password: Joi.string().required(),
        confirm_password: Joi.string()
        .valid(Joi.ref('password'))
        .required(),
        terms_and_condition: Joi.boolean().valid(true).required()
    }),

    Login: Joi.object().keys({
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
        password: Joi.string().required()
    }),

    UpdateProfile: Joi.object().keys({
        name: Joi.string().allow(null, ""),
        dob: Joi.string().allow(null, ""),
        phone: Joi.string().allow(null, ""),
        country_code: Joi.string().allow(null, ""),
        email: Joi.string().allow(null, ""),
        profile_image: Joi.string().allow(null, ""),
        gender: Joi.number().valid(...Object.values(CONSTANTS.GENDER)).allow(null, ""),
        address: Joi.string().allow(null, ""),
        password: Joi.string().allow(null, ""),
        newPassword: Joi.when("password", {
            is: Joi.exist(),
            then: Joi.string()
            .pattern(CONSTANTS.PASSWORD_VALIDATION_REGEX)
            .message(CONSTANTS_MESSAGES.INVALID_PASSWORD)
            .invalid(Joi.ref("password"))
            .required(),
            otherwise: Joi.string().allow(null, "")
        }),
        state: Joi.number().allow(null, ""),
        city: Joi.string().allow(null, ""),
        pin_code: Joi.number().allow(null, ""),
        plan: Joi.object().optional(),
        verified: Joi.object().optional()
    })
    .min(1),
    
    ResetPassword: Joi.object().keys({
        password: Joi.string().required(),
        confirm_password: Joi.string().required().equal(Joi.ref('password')).messages({
            'any.only': 'Confirm password must match password'
        })
    }),
}

module.exports = UserAuthSchema