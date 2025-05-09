const Joi = require("joi");
const {CONSTANTS} = require("../Constant");

const PrivilegeSchema = {
    Add: Joi.object().keys({
       
    }),
    Edit: Joi.object().keys({      
            
    }).min(1),
        
}

module.exports = PrivilegeSchema;