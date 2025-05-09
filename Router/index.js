const express = require("express")
const router = express.Router();
const { VERSION } = require("../Config")
const AdminRouter = require("./admin.routes")
const UserRouter = require("./user.routes")
// const PublicRouter = require("./public.routes")


const defaultRoutes = [
    {
        path: `/${VERSION}/admin`,
        route: AdminRouter
    },
    {
        path: `/${VERSION}/user`,
        route: UserRouter
    },
    // {
    //     path: `/${VERSION}/public`,
    //     route: PublicRouter
    // },
    
];

defaultRoutes.forEach((route)=>{
    router.use(route.path, route.route)
})

module.exports = router