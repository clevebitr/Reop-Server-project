//adminapi传来的数据在这里处理用户请求
const express = require("express");
const NewsRoute = express();//实例化
const NewsController = require("../../controller/admin/NewsController")
//multer,处理用户上传的文件
const multer  = require('multer')
const upload = multer({ dest: 'public/newsuploads/' })//用户上传的数据存放在该路径


NewsRoute.post("/add",upload.single('file'),NewsController.add)
NewsRoute.post("/list",upload.single('file'),NewsController.updateList)
NewsRoute.delete("/list/:id",NewsController.delList)
NewsRoute.get("/list",NewsController.getlist)
NewsRoute.get("/list/:id",NewsController.getlist)
NewsRoute.put("/publish",NewsController.publish)
// NewsRoute.upload("/upload:id")

module.exports  = NewsRoute