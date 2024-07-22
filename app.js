const express = require("express");
const app = express();//实例化express
const routes = require("./routes");
const port = 3000;

var cookieParser = require('cookie-parser');
var logger = require('morgan');
//跨域
const cors = require('cors');
//错误token处理
const errorhandler = require('./middleware/errorhandler')
//token key
var { expressjwt:jwt } = require("express-jwt")
const SECRET_KEY = 'REOPHTMLKEY';

app.use(express.json()); //使用express.json中间件处理post到的json数据

//免token验证的接口地址
app.use(jwt({ 
    secret:SECRET_KEY, algorithms: ['HS256'] 
}).unless({ path:['/api/login','/api/add','/api/update'] }))
  
//路由加载前使用中间件
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
  
  //跨域中间件
  app.use(cors());

  app.use(cookieParser());
routes(app);

app.get("/",(req,res)=>{ //访问默认路径
    res.send("Reop Server");
})

// 错误中间件写在最后
app.use(errorhandler)


app.listen(port,()=>{ //监听端口
    console.log(`express Reop Server listening at http://localhost:${port}`);
})