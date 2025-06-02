const mongoose = require("mongoose");

// Define Vendor Schema
const EventSchema = new mongoose.Schema(
  {
    event_name: {
      type: String,
      required: [true, "Please provide an event"],
      // unique: true,
      lowercase: true,
      trim: true,
      maxlength: 100,
    },
    category_id: {
       type : mongoose.Schema.Types.ObjectId,
       ref : "categories",
       required : true,   
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


const Event = mongoose.model("event", EventSchema);

module.exports = Event;
