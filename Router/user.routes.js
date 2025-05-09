const express = require("express")
const router = express.Router();
const multer = require("multer")
const { ValidateRequest, UserAuth } = require("../Middleware");
const { UserAuthSchema, CommonSchema, UserSchema, AdminSchema } = require("../Validation");
const { CatchAsync } = require("../Utils");
const { UserAuthController, UserController } = require("../controller");

const upload = multer();

router.post("/signup", ValidateRequest(UserAuthSchema.Signup, "body"), CatchAsync(UserAuthController.SignUp));
router.post("/login", ValidateRequest(UserAuthSchema.Login, "body"), CatchAsync(UserAuthController.Login));
router.post("/logout", UserAuth, CatchAsync(UserAuthController.Logout));
router.post("/resetpassword", UserAuth, ValidateRequest(UserAuthSchema.ResetPassword, "body"), CatchAsync(UserAuthController.ResetPassword));
router.post("/forgotpassword", ValidateRequest(CommonSchema.ForgotPassword, "body"), CatchAsync(UserAuthController.ForgotPassword))
router.post("/add-member", ValidateRequest(UserSchema.AddMember, "body"), UserAuth, CatchAsync(UserController.AddMember))
router.post("/request-update-member", ValidateRequest(UserSchema.UpdateMember, "body"), UserAuth, CatchAsync(UserController.UpdateMember))
router.post("/add-health-checkup", ValidateRequest(UserSchema.AddHealthTest, "body"), UserAuth, CatchAsync(UserController.AddHealthTest))
router.post("/add-claim", ValidateRequest(UserSchema.AddClaim, "body"), UserAuth, CatchAsync(UserController.AddClaim))
router.post("/upload-file", UserAuth, upload.array('files', 5), CatchAsync(UserController.UploadFile))
router.post("/create-orders", UserAuth, ValidateRequest(UserSchema.CreateOrder, "body"), CatchAsync(UserController.CreateOrder))
router.post("/create-plan-upgrade-orders", UserAuth, ValidateRequest(UserSchema.CreateOrder, "body"), CatchAsync(UserController.CreateUpgradePlanOrder))
router.post("/create-plan-renew-orders", UserAuth, ValidateRequest(UserSchema.CreateOrder, "body"), CatchAsync(UserController.CreateRenewPlanOrder))
router.post("/verify-payment", ValidateRequest(CommonSchema.VerifyPayment, "body"), UserAuth, CatchAsync(UserController.VerifyPayment))
router.post("/verify-plan-upgrade-payment", ValidateRequest(CommonSchema.VerifyPayment, "body"), UserAuth, CatchAsync(UserController.VerifyPlanUpgradePayment))
router.post("/verify-plan-renew-payment", ValidateRequest(CommonSchema.VerifyPayment, "body"), UserAuth, CatchAsync(UserController.VerifyPlanRenewPayment))

router.get("/get-profile", UserAuth, CatchAsync(UserAuthController.GetProfile));
router.get("/get-members", UserAuth, CatchAsync(UserController.GetMembers));
router.get("/get-claims", ValidateRequest(UserSchema.ClaimPagination, "query"), UserAuth, CatchAsync(UserController.GetClaims))
router.get("/get-claim-details", ValidateRequest(CommonSchema.ParamsId, "query"), UserAuth, CatchAsync(UserController.GetClaim))
router.get("/get-subscribed-plan", UserAuth, CatchAsync(UserController.GetSubscribedPlan))
router.get("/get-claimable-amount", ValidateRequest(UserSchema.CalculationQuery, "query"), UserAuth, CatchAsync(UserController.GetClaimCalculation))
router.get("/get-health-checkups", UserAuth, CatchAsync(UserController.GetHealthTests))
router.get("/get-plan-price-details", ValidateRequest(UserSchema.CreateOrder, "query"), UserAuth, CatchAsync(UserController.GetCouponDiscount))
router.get("/get-upgrade-plan-price-details", ValidateRequest(UserSchema.CreateOrder, "query"), UserAuth, CatchAsync(UserController.GetCouponDiscountPlanUpgrade))
router.get("/get-renew-plan-price-details", ValidateRequest(UserSchema.CreateOrder, "query"), UserAuth, CatchAsync(UserController.GetCouponDiscountPlanRenew))
router.get("/get-wallet-balance", UserAuth, CatchAsync(UserController.GetWalletBalance))
router.get("/get-transactions", UserAuth, CatchAsync(UserController.GetWalletTransactions))

router.put("/update-profile", ValidateRequest(UserAuthSchema.UpdateProfile, "body"), UserAuth, CatchAsync(UserAuthController.UpdateProfile))
router.put("/update-password", ValidateRequest(CommonSchema.UpdatePassword, "body"), CatchAsync(UserAuthController.UpdatePassword))
router.patch("/edit-claim/:id",  UserAuth, CatchAsync(UserController.EditClaim))
router.get("/get-disputed-claims", ValidateRequest(CommonSchema.Pagination, "query"), UserAuth, CatchAsync(UserController.GetDisputedClaims))
router.get("/get-disputed-claim-details/:id", ValidateRequest(CommonSchema.ParamsId, "params"), UserAuth, CatchAsync(UserController.GetDisputedClaim))
router.patch("/claim-dispute/:id",  UserAuth, ValidateRequest(CommonSchema.ParamsId, "query"), ValidateRequest(UserSchema.RaiseClaimDispute,"body"), CatchAsync(UserController.RaiseClaimDispute))

router.delete("/delete-member", ValidateRequest(CommonSchema.ParamsId, "query"), UserAuth, CatchAsync(UserController.DeleteMember));
router.post("/refer", UserAuth, ValidateRequest(UserSchema.Refer, "body"), CatchAsync(UserController.ReferUser));
router.get("/upgrade-plan", UserAuth, ValidateRequest(AdminSchema.PlanPagination, "query"), CatchAsync(UserController.GetUpgradePlans));

router.get("/get-queued-plans", ValidateRequest(CommonSchema.Pagination, "query"), UserAuth, CatchAsync(UserController.GetQueuedPlans))
module.exports = router