const Joi = require("joi");
const {CONSTANTS} = require("../../Constant");

const AdminSchema = {

    AddDesignation: Joi.object().keys({
        designation: Joi.string().required(),        
    }),
    EditDesignation: Joi.object().keys({      
        designation: Joi.string().required(),        
    }),
   
  
    UserPagination:Joi.object().keys({
        search:Joi.string().min(0).max(50).optional(),
        page: Joi.string().regex(/^\d+$/).max(10000).optional(),
        pageSize: Joi.string().regex(/^\d+$/).max(1000).optional(),
        sortBy:Joi.string().optional(),
        sortOrder:Joi.string().optional(),
        subscriberTypeStatus:Joi.string().optional(),
        startDate: Joi.date().iso().less('now').optional(),      
        endDate: Joi.date().iso().greater(Joi.ref('startDate')).optional(), 
    }),

    AddCategory: Joi.object().keys({
        category_name: Joi.string().required(),        
    }),

    AddEvent: Joi.object().keys({
        event_name: Joi.string().required(),        
    }),
   
}

module.exports = AdminSchema;
