const mongoose = require("mongoose");

const PrivilegeSchema = new mongoose.Schema({

    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "ManagmentUsers",
        required : true,
    },
    module_id : {
        type : Number,
        required : true,
    },
    program_id : {
        type : Number,
        required : true,
    },
    GET : {
        type : Boolean,
        default : true,
        required : true,
    },
    POST : {
        type : Boolean,
        default : true,
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