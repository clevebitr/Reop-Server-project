//为了不使app.js变得臃肿，单独使用这个文件挂载。
const post = require("./post");
const api = require("./main");
module.exports = (app) =>{
    app.use("/post",post);
    app.use("/api",api)
}