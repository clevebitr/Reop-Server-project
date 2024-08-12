//adminapi传来的数据在这里处理用户请求
const express = require("express");
const NewsRoute = express();//实例化
const NewsController = require("../../controller/web/NewsController")


NewsRoute.get("/list",NewsController.getlist)


module.exports  = NewsRoute