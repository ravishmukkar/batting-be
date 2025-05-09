const config = require("../Config")

const EmailTemplate = {
    SignUp: (data) => {
        const template = `Dear ${data.name}, <br/><br/>
         Your user id is ${data.email}.<br/><br/>
          ${data.template}`
        
        return {
            to: data.email,
            from: config.SENDGRID_EMAIL_FROM,
            subject: "OPDSure Welcome mail ",
            text: "Please verify your mail",
            html: template
        }
    },

    ForgotPassword: (data) => {
        const template = `${config.WEB_URL}admin/reset_password?token=${data.token}`
        return {
            to: data.email,
            from: config.SENDGRID_EMAIL_FROM,
            subject: "Forgot password",
            text: `${config.WEB_URL}forgotpassword?token=${data.token}`,
            html: template
        }
    },
   
    ClaimSubmission: (data) => {
        const template = `Dear ${data?.name?.replace(/\b\w/g, (l) => l.toUpperCase())}, <br/><br/>
        Your Claim ID is ${data?.claim_id}.<br/><br/>
        ${data?.template}`;
        return {
            to: data.email,
            from: config.SENDGRID_EMAIL_FROM,
            subject: "Confirmation of Claim Submission in OPDSure",
            text: "Your claim is submitted successfully",
            html: template
        }
    },

    ClaimUpdation: (data) => {
        const template = `Dear ${data?.name?.replace(/\b\w/g, (l) => l.toUpperCase())}, <br/><br/>
         Your Claim ID is ${data?.claim_id}. <br/><br/>
         ${data?.template}`
        return {
            to: data.email,
            from: config.SENDGRID_EMAIL_FROM,
            subject: "Confirmation of Claim Re-Submission in OPDSure",
            text: "Your claim is updated successfully",
            html: template
        }
    },

    ClaimApproval: (data) => {
        const template = `Dear ${data?.name?.replace(/\b\w/g, (l) => l.toUpperCase())}, <br/><br/>
         Your Claim ID is ${data?.claim_id}.  <br/><br/>
         ${data?.template}`
        return {
            to: data.email,
            from: config.SENDGRID_EMAIL_FROM,
            subject: "Confirmation of Claim Approval in OPDSure",
            text: "Your claim has been approved",
            html: template
        }
    },

    ClaimRejection: (data) => {
        const template = `Dear ${data?.name?.replace(/\b\w/g, (l) => l.toUpperCase())}, <br/><br/>
         Your Claim ID is ${data?.claim_id}. <br/><br/>
          ${data.template}`
        return {
            to: data.email,
            from: config.SENDGRID_EMAIL_FROM,
            subject: "Rejection of Claim Submitted in OPDSure",
            text: "Your claim has been rejected",
            html: template
        }
    },

    ClaimClarification: (data) => {
        const template = `Dear ${data?.name?.replace(/\b\w/g, (l) => l.toUpperCase())}, <br/><br/>
         Your Claim ID is ${data?.claim_id}.  <br/><br/>
         ${data.template}`
        return {
            to: data.email,
            from: config.SENDGRID_EMAIL_FROM,
            subject: "Clarification Required on Claim in OPDSure",
            text: "Your claim requires clarification",
            html: template
        }
    },

    ClaimInvalid: (data) => {
        const template = `Dear ${data?.name?.replace(/\b\w/g, (l) => l.toUpperCase())}, <br/><br/>
         Your Claim ID is ${data?.claim_id}.  <br/><br/>
         ${data.template}`
        return {
            to: data.email,
            from: config.SENDGRID_EMAIL_FROM,
            subject: "OPDSure Claim declared Invalid",
            text: "Your claim is invalid",
            html: template
        }
    },

    PlanPurchase: (data) => {
        const template = `Dear ${data?.name?.replace(/\b\w/g, (l) => l.toUpperCase())}, <br/><br/>
         Your have successfully purchased plan has been purchased.<br/><br/>
         ${data.template}`
        return {
            to: data.email,
            from: config.SENDGRID_EMAIL_FROM,
            subject: "Payment Confirmation for OPDSure Subscription",
            text: "Your plan has been purchased",
            html: template
        }
    }
   
}

module.exports = EmailTemplate