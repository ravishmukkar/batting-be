const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema(
  {
    registration: {
      type: String,
      required: false, 
    },
    plan_purchase_mail:{
      type: String,
      required: false,
    },
    hc_plan_purchase_mail:{
      type: String,
      required: false,
    },
    plan_expiry_mail:{
      type: String,
      required: false,
    },
    hc_plan_expiry_mail:{
      type: String,
      required: false,
    },
    claim_submission_mail:{
      type: String,
      required: false,
    },
    claim_approval_mail:{
      type: String,
      required: false,
    },
    claim_rejection_mail:{
      type: String,
      required: false,
    },
    claim_clarification_mail:{
      type: String,
      required: false,
    },
    claim_updation_mail:{
      type: String,
      required: false,
    },
    claim_invalid_mail:{
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Email = mongoose.model('Email', EmailSchema);

const defaultData = {
  registration: "",
  plan_purchase_mail:"",
  hc_plan_purchase_mail:"",
  plan_expiry_mail:"",
  hc_plan_expiry_mail:"",
  claim_submission_mail:"",
  claim_approval_mail:"",
  claim_rejection_mail:"",
  claim_clarification_mail:"",
  claim_updation_mail:"",
}

const initializeSettings = async () => {
  try {
    const count = await Email.countDocuments();
    if (count == 0) {
      await Email.create(defaultData);
      console.log('Initialized default settings');
    }
  } catch (error) {
    console.error('Error initializing settings:', error);
  }
};

initializeSettings();
module.exports = Email;
