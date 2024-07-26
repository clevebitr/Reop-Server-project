//为了不使app.js变得臃肿，单独使用这个文件挂载。
// const post = require("./post");
const adminapi = require("./main");
const UserRoute = require("./admin/UserRoute")


module.exports = (app) =>{
    //app.use("/post",post);
    app.use("/adminapi",adminapi)
    app.use("/adminapi/user/",UserRoute)//挂载UserRoute子路由
}