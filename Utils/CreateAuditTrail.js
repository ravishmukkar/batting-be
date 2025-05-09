const {AuditTrail} = require("../DAL") ;

const CreateAuditTrail = async (req,res,program) => {
    const auditLog = { 
        path:req.originalUrl,
        user_id:req.admin._id,
        method:req.method,
        program_id:program.id,
        program_name:program.value,
        old_record:JSON.stringify(res),
        new_record:JSON.stringify(req.body)
    }

    console.log(auditLog)
    await AuditTrail.CreateAdminAuditTrail(auditLog)
    
};

module.exports = CreateAuditTrail;
