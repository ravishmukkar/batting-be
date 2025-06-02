const mongoose = require("mongoose");

const PrivilegeSchema = new mongoose.Schema({

    admin_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "adminDetails",
        required : true,
    },
    module_id : {
        type : Number,
        required : true,
    },
   
    GET : {
        type : Boolean,
        default : false,
        required : true,
    },
    POST : {
        type : Boolean,
        default : false,
        required : true,
    },
    PATCH : {
        type : Boolean,
        default : false,
        required : true,
    },
    DELETE : {
        type : Boolean,
        default : false,
        required : true,
    },
    
},{ timestamps:true })

module.exports = mongoose.model("privileges", PrivilegeSchema);