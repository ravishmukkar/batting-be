const mongoose = require("mongoose");
const {CONSTANTS} = require("../Constant")

const DesignationSchema = new mongoose.Schema(
  {    
    designation: {
      type:String,
      unique:true,
      required: true,      
    },
    internal_id: {
      type:Number,
      required: false,  
      default:null    
    },
  },
  { timestamps: true }
);

const Designations = mongoose.model('Designations', DesignationSchema);

const defaultDesignations = Object.values(CONSTANTS.DESIGNATIONS).map(designation => ({
  internal_id: designation.internal_id,
  designation: designation.value,
}));

const initializeDesignations = async () => {
  try {
    const count = await Designations.countDocuments();
    if (count === 0) {
      await Designations.insertMany(defaultDesignations);
      console.log("Default designations added to the collection.");
    }
  } catch (error) {
    console.error("Error initializing default designations:", error);
  }
};

initializeDesignations();


module.exports = Designations;
