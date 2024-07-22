# 🎶Reop Server
## 😊简介：
本项目是基于Reop HTML 项目的单独后端项目，旨在替代Reop HTML后端
## 😉概述：
 - 本项目是`为了ReopHTMl项目而开发`的。在开发ReopHTML项目时，由于本人不了解后端技术，导致ReopHTML项目的后端部分过于臃肿，本项目是为了开发出更轻量化的ReopHTML后端。
 - 本项目依然使用`express框架`结构，但尽可能减少不必要的文件。
 - 本项目使用`mongoDB`作为主数据库。
 - Node.js 版本选择 `v22.5.1` 稳定版。
 - `nvm`做为nodejs的版本管理工具。
 - `npm`作为本项目的包管理器

 ## 😎启动项目：
 1. 安装`node.js v22.5.1`
 2. 初始化项目
``` shell
> cd ./Reop Server project/
> npm init -y
```
3. 安装依赖包：

    name     | version
    -------- | -----
    cookie-parser | 1.4.6
    cors  | 2.8.5
    express-jwt | 8.4.1
    express|4.19.2
    jsonwebtoken|9.0.2
    morgan|1.10.0
    mysql2|3.1.1
    sequelize|6.37.3
``` shell
> npm install cookie-parser@1.4.6
> npm install cors@2.8.5
> npm install express-jwt@8.4.1
> npm install express@4.19.2
> npm install jsonwebtoken@9.0.2
> npm install morgan@1.10.0
> npm install mysql2@3.1.1
> npm install sequelize@6.37.3
```
4. 运行项目
``` shell
> node app.js
或者
> npm run dev
```
## 😁API：
功能描述|api地址|请求类型|是否需要token
-------|-------|-------|------------
登录|http://localhost:3000/api/login  |post|否
注册|http://localhost:3000/api/add  |post|否
更新信息|http://localhost:3000/api/update | put|否
删除|http://localhost:3000/api/delete|post|是
查询信息|http://localhost:3000/api/search|get|是 
