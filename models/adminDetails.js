const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide email name"],
      lowercase: true,
      trim: true,
      maxlength: 50,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please provide name"],
    },
    phone: {
      type: Number,
      required: [true, "Please provide phone"],
    },
    country_code: {
      type: String,
      required: [true, "Please provide country code"],
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
    admin_type: {
      type: Number,
      required: true
    },
    profile_image: {
      type: String,
      default: null, // To store the path or URL of the profile image
    },
    is_active: {
      type: Boolean,
      default: true, // To indicate if the admin is active or deactivated
    },
    last_login: { type: Date, default: null }, /** last login */
  },
  { timestamps: true }
);
AdminSchema.pre("save", function (next) {
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

AdminSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (error, isMatch) {
    if (error) {
      return callback(error);
    } else {
      callback(null, isMatch);
    }
  });
};

module.exports = mongoose.model("adminDetails", AdminSchema);
