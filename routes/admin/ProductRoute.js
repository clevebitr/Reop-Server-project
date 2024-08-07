//adminapi传来的数据在这里处理用户请求
const express = require("express");
const ProductRoute = express();//实例化
const ProductController = require("../../controller/admin/ProductController")
//multer,处理用户上传的文件
const multer  = require('multer')
const upload = multer({ dest: 'public/productuploads/' })//用户上传的数据存放在该路径


ProductRoute.post("/add",upload.single('file'),ProductController.add)
ProductRoute.post("/list",upload.single('file'),ProductController.updateList)
ProductRoute.delete("/list/:id",ProductController.delList)
ProductRoute.get("/list",ProductController.getlist)
ProductRoute.get("/list/:id",ProductController.getlist)
// NewsRoute.put("/publish",NewsController.publish)
// ProductRoute.upload("/upload:id")

module.exports  = ProductRoute