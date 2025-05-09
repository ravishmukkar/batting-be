require("dotenv").config();

const config = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URL,
  VERSION: process.env.VERSION,
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
  JWT_TOKEN_VALIDITY: process.env.JWT_TOKEN_VALIDITY,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SENDGRID_EMAIL_FROM: process.env.SENDGRID_EMAIL_FROM,
  WEB_URL: process.env.WEB_URL,
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: process.env.S3_REGION,
  bucketName: process.env.S3_BUCKET_NAME,
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  RAZORPAY_KEY_ID_TO_PAY: process.env.RAZORPAY_KEY_ID_TO_PAY,
  RAZORPAY_KEY_SECRET_TO_PAY: process.env.RAZORPAY_KEY_SECRET_TO_PAY,
  RAZORPAY_ACCOUNT_NUMBER: process.env.RAZORPAY_ACCOUNT_NUMBER
};

module.exports = config;
