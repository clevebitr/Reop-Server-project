//adminapi传来的数据在这里处理用户请求
const express = require("express");
const UserController = require("../../controller/admin/UserController")


const UserRoute = express();//实例化


UserRoute.post("/login",UserController.login)

module.exports  = UserRoute