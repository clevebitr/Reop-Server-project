const express = require("express");
const route = express();//实例化

// https://localhost:3000/post/
route.get("/",(req,res)=>{ //访问默认路径
    res.send("Reop Server");
})

// https://localhost:3000/post/
route.post("/",(req,res)=>{
    console.log("收到请求体：",req.body);//控制台输出收到的响应体
    res.status(201).send();
})

// https://localhost:3000/post/
route.put("/:id",(req,res)=>{
    console.log("收到请求参数，id为",req.params.id);
    console.log("收到请求体：",req.body);

    res.send();
})

// https://localhost:3000/post/
route.delete("/:id",(req,res)=>{
    console.log("收到请求参数，id为",req.params.id);
    res.status(204).send();
})

module.exports = route;