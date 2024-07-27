//adminapi传来的数据在这里处理用户请求
const express = require("express");
const UserController = require("../../controller/admin/UserController")//调用UserController方法处理用户信息
//multer,处理用户上传的文件
const multer  = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })//用户上传的数据存放在该路径

const UserRoute = express();//实例化


UserRoute.post("/login",UserController.login)//用户登录Api,调用UserController.login方法
UserRoute.post("/upload",upload.single('file'),UserController.upload)//用户更新数据api，调用UserController.upload方法
UserRoute.post("/add",upload.single('file'),UserController.add)
UserRoute.get("/list",UserController.getlist)
module.exports  = UserRoute