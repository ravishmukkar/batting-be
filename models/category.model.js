const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {    
    category_name: {
      type:String,
      unique:true,
      required: true,      
    },
    is_active: {
      type: Boolean,
      default: true, // To indicate if the admin is active or deactivated
    },
    created_by : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "adminDetails",
        required : true,
    }
  },
  { timestamps: true }
);

const Designations = mongoose.model('Category', CategorySchema);


module.exports = Designations;
