const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define Vendor Schema
const VendorSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 100,
    },
    username: {
      type: String,
      required: [true, "Please provide a login name"],
      trim: true,
      unique: true,
      maxlength: 50,
    },
    name: {
      type: String,
      required: [true, "Please provide  name"],
      trim: true,
      maxlength: 50,
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
      trim: true,
      maxlength: 15, // Can be adjusted based on international format
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      maxlength: 500,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Ensure the User model exists
      },
    ],
    is_active: {
      type: Boolean,
      default: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Password hashing middleware
VendorSchema.pre("save", function (next) {
  const vendor = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) return next(saltError);

      bcrypt.hash(vendor.password, salt, function (hashError, hash) {
        if (hashError) return next(hashError);

        vendor.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// Compare password method
VendorSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (error, isMatch) {
    if (error) return callback(error);
    callback(null, isMatch);
  });
};

module.exports = mongoose.model("Vendor", VendorSchema);
