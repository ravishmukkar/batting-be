const express = require("express");
const router = express.Router();
const multer = require("multer")
const { ValidateRequest, AdminAuth, ValidatePrivilege } = require("../Middleware/index");
const { AdminAuthSchema, CommonSchema,  AdminSchema, EmailSchema } = require("../Validation");
const { CatchAsync } = require("../Utils");
const { AdminAuthController, AdminController,DesigController} = require("../controller");
const { CONSTANTS } = require("../Constant");
const path = require('path');
const { uploadFileHandler } = require('./../controller/common/uploadController');
const fs = require('fs');

// Set up storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Get the user type from the request (assuming it's available in req.user)
      const userType = req.user?.role || 'user'; // Defaults to 'user' if not provided
  
      // Determine the folder based on the user type
      let uploadFolder = '';
 
      // // If uploading profile image, check if the user is admin or regular user
      if (req.originalUrl.includes('/edit-profile')) {
        uploadFolder = req.admin.admin_type === 1 ? 'super-admin' : 'admin';
      } else if (req.originalUrl.includes('/post-image')) {
        // If uploading post image, store it in the 'posts' folder
        uploadFolder = 'posts';
      } else {
        // Default folder
        uploadFolder = 'others';
      }
  
      // Specify the folder path dynamically based on the user type
      // const folderPath = path.join(__dirname, `./../uploads/${uploadFolder}/${req.admin.token}`);
      const folderPath = path.join(__dirname, `../uploads/${uploadFolder}/${req.admin._id}`);

       // Create the folder if it doesn't exist
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }
      // Set the destination folder
      cb(null, folderPath);
    },
    filename: (req, file, cb) => {
      // Set the filename to avoid overwriting (use unique timestamp)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = path.extname(file.originalname); // Get the file extension
      cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
    },
  });
  

const upload = multer({ storage });
router.patch('/edit-profile-image',AdminAuth, upload.single('files'), uploadFileHandler);

router.post("/signup", ValidateRequest(AdminAuthSchema.Signup, "body"), CatchAsync(AdminAuthController.SignUp));
router.post("/login", ValidateRequest(AdminAuthSchema.Signin, "body"), CatchAsync(AdminAuthController.Login));
router.post("/logout", AdminAuth, CatchAsync(AdminAuthController.Logout));
router.get("/get-profile", AdminAuth, CatchAsync(AdminController.GetProfile));
router.patch("/edit-profile", AdminAuth, CatchAsync(AdminController.EditProfile));

router.post("/resetpassword", AdminAuth, ValidateRequest(AdminAuthSchema.ResetPassword, "body"), CatchAsync(AdminAuthController.ResetPassword));
router.post("/forgotpassword", ValidateRequest(AdminAuthSchema.ForgotPassword, "body"), CatchAsync(AdminAuthController.ForgotPassword))
router.post("/UpdatePassword/:token",  CatchAsync(AdminAuthController.ResetForgotPassword))


router.post("/designation", AdminAuth, ValidatePrivilege(CONSTANTS.PRIVILEGE.PROGRAMME.ADMIN.DESIGNATION.id,"POST"), ValidateRequest(AdminSchema.AddDesignation, "body"), CatchAsync(DesigController.Add));
router.get("/designation", AdminAuth, ValidateRequest(CommonSchema.Pagination, "query"),CatchAsync(DesigController.GetAll));
router.patch("/designation/:id", AdminAuth, ValidatePrivilege(CONSTANTS.PRIVILEGE.PROGRAMME.ADMIN.DESIGNATION.id,"PATCH"), ValidateRequest(CommonSchema.ParamsId, "params") ,ValidateRequest(AdminSchema.EditDesignation, "body") , CatchAsync(DesigController.Edit));
router.delete("/designation/:id", AdminAuth,  ValidateRequest(CommonSchema.ParamsId, "params"), CatchAsync(DesigController.Delete));
router.delete("/bulk-designation-delete", AdminAuth, ValidatePrivilege(CONSTANTS.PRIVILEGE.PROGRAMME.ADMIN.DESIGNATION.id,"DELETE"), ValidateRequest(CommonSchema.BulkDeleteIds, "body"), CatchAsync(DesigController.BulkDeleteDesignations));

/** Get all masterd */
router.get("/master", AdminAuth, CatchAsync(AdminController.GetAllMasters));

/** Get all privilege */
router.post("/privilege", AdminAuth, CatchAsync(AdminController.AddPrivilege));
router.get("/privilege/:designation_id", AdminAuth, CatchAsync(AdminController.GetAllPrivilege));
router.get("/privilege/:user_id/:program_id", AdminAuth, CatchAsync(AdminController.GetIndividualPrivilege));
router.patch("/privilege/:designation_id", AdminAuth, CatchAsync(AdminController.EditPrivilege));

/** admin routes */
router.post("/admin", ValidateRequest(AdminAuthSchema.Signup, "body"), CatchAsync(AdminAuthController.SignUp));
router.get("/admin", AdminAuth, ValidateRequest(CommonSchema.Pagination, "query"), CatchAsync(AdminController.GetAllAdmin));
router.patch("/admin/:id", AdminAuth,ValidateRequest(CommonSchema.ParamsId, "params"), CatchAsync(AdminController.EditAdmin));
router.delete("/admin/:id", AdminAuth,ValidateRequest(CommonSchema.ParamsId, "params"), CatchAsync(AdminController.DeleteAdmin));
router.delete("/bulk-admin-delete", AdminAuth,  ValidateRequest(CommonSchema.BulkDeleteIds, "body"), CatchAsync(AdminController.BulkDeleteAdmin));
router.patch("/admin/status/:id/:is_active", AdminAuth,ValidateRequest(CommonSchema.StatusId, "params"), CatchAsync(AdminController.EditAdminStatus));
router.patch("/admin/admin_type/:id/:admin_type", AdminAuth,ValidateRequest(CommonSchema.AdminType, "params"), CatchAsync(AdminController.EditAdminType));

router.get("/email-settings",  CatchAsync(AdminController.GetEmailTemplate));
router.patch("/email-settings/:id", AdminAuth, ValidateRequest(CommonSchema.ParamsId, "params"), ValidateRequest(EmailSchema.Edit, "body"), CatchAsync(AdminController.EditEmailTemplate));

module.exports = router;
