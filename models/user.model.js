const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {CONSTANTS} = require("../Constant");

const UserSchema = new mongoose.Schema(
  { 
    subscriber_type:{
      type: Number,
      default: 1
    },
    name: {
        type: String,
        required: false
    },
    unique_id: {
      type: String,
      required: false
    },
    email: {
      type: String,
      required: false,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      maxlength: 500,
    },
    token: {
      type: [String],
      default: []
    },
    state: {
      type: Number,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    pin_code: {
      type: Number,
      required: false,
    },
    address: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    country_code: {
        type: String,
        required: false,
    },
    gender: {
        type: Number,
        require: false
    },
    dob: {
        type: String,
        required: false,
    },
    profile_image: {
        type: String,
        required: false
    },
    verified: {
      email: {
        type: Boolean,
        default: false
      },
      phone: {
        type: Boolean,
        default: false
      }
    },
    plan: {
      purchased: {
        type: Boolean,
        default: false
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plans",
        required: false
      },
      membership_id: {
        type: Number,
        required: false
      },
      health_plan_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "healthCheckupPlans",
        required: false
      },
      start_date: {
        type: String,
        required: false,
      },
      end_date: {
        type: String,
        required: false,
      },
      paid_price: {
        type: Number,
        required:false,
        default:0
      }
    },
    wallet_balance: {
      type: Number,
      default: 0
    },
    reset_default_password:{
      type: Number,
      default: 1
    },
    corporate : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Corporates",
      required : false,
      default: null
    },
    employeeId : {
      type : String,
      required : false
    },
    designation : {
      type : String,
      required : false
    },
    department : {
      type : String,
      required : false
    },
    bank_name : {
      type : String,
      required : false
    },
    status : {
      type : Number,
      required : false
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (error, isMatch) {
    if (error) {
      return callback(error);
    } else {
      callback(null, isMatch);
    }
  });
};


module.exports = mongoose.model("users", UserSchema);
