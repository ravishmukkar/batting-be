const mongoose = require("mongoose");
const { CONSTANTS } = require("../Constant");

const DisputedClaimSchema = new mongoose.Schema({
    original_claim_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "claims",
        required: true,
    },
    files: {
      type: [String],
      require: false
   },
    internal_status: {
        type: Number,
        required: true,
        default: CONSTANTS.CLAIM.INTERNAL_STATUS.NO_ACTION,
    },
    dispute_status: {
        type: Number,
        required: true,
        default: CONSTANTS.CLAIM.DISPUTE_STATUS.RAISED,
    },
    assigned_to_verifier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "managmentusers",
        required: false,
    },
    assigned_to_manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "managmentusers",
        required: false,
    },
    assigned_to_financer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "managmentusers",
        required: false,
    },
    verifier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "managmentusers",
        default: null,
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "managmentusers",
        default: null,
    },
    financer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "managmentusers",
        default: null,
    },
    remark: [
        new mongoose.Schema({
            designation: {
              type: Number,
              required: false,
              default: null
            },
            approver_id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "managmentusers",
              required: false,
              default: null
            },
            message: {
              type: String,
              required: false
            },
            message_claim_internal_status: {
              type: Number,
              required: false,
              default: null
            }
          }, {
            timestamps: { createdAt: true, updatedAt: false }
          })
     ],
    dispute:{
        type:Boolean,
        default: false
    },
    subscriber_remark: [
        new mongoose.Schema({
            designation: {
              type: Number,
              default: null
            },
            approver_id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "managmentusers",
              default: null
            },
            message: {
              type: String,
              required: true
            },
          }, {
            timestamps: { createdAt: true, updatedAt: false }
          })
     ],
     claim_closure_Date:{
      type: Date,
      required: false,
     }
},{ timestamps: true });

module.exports = mongoose.model("disputedClaims",DisputedClaimSchema);