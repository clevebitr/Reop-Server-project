//adminapi传来的数据在这里处理用户请求
const express = require("express");
const ProductRoute = express();//实例化
const ProductController = require("../../controller/web/ProductController")


ProductRoute.get("/list",ProductController.getlist)
ProductRoute.get("/list/:id",ProductController.getlist)
// ProductRoute.get("/toplist",ProductController.getToplist)


module.exports  = ProductRoute