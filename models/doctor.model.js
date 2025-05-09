const mongoose = require("mongoose");
const { CONSTANTS } = require("../Constant");

const DoctorSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
    },
    reg_no : {
        type : String,
        required : true,
    },
    specialization : {
        type : String,
        required : false,
    },
    hospital : {
        type : String,
        required : false,
    },
    address : {
        type : String,
        required : false,
    },
    state : {
        type : Number,
        required : false,
    },
    mobile : {
        type : String,
        required : false,
    },
    exp : {
        type : Number,
        required : false,
    },
    country_code : {
        type : String,
        required : false,
    },
    email : {
        type : String,
        required : false,
        lowercase: true,
        trim: true,
    },
    status : {
        type : Number,
        required : false,
    },
    added_by:{
        default: CONSTANTS.DOCTOR.ADDED_BY_DOCTOR,
        type: Number,
    },
    approved_by_admin:{
        default: CONSTANTS.DOCTOR.NOACTION_BY_ADMIN,
        type: Number,
    },
},{ timestamps:true })

module.exports = mongoose.model("doctors", DoctorSchema);