const express = require("express");
const app = express();//实例化express

const routes = require("./routes");//路由
const port = 3000;//运行端口
var cookieParser = require('cookie-parser');//Cookies
// var logger = require('morgan');//日志
const cors = require('cors');//跨域
const errorhandler = require('./middleware/errorhandler')//错误中间件
var { expressjwt:jwt } = require("express-jwt")//token
const SECRET_KEY = 'REOPHTMLKEY';// key

//免token验证的接口地址
app.use(jwt({
    secret:SECRET_KEY, algorithms: ['HS256'] //加密算法HS256
}).unless({ path:['/api/login','/api/add','/api/update','/'] }))
  
//路由加载前使用中间件
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //使用express.json中间件处理post到的json数据

//跨域中间件
app.use(cors());

app.use(cookieParser(SECRET_KEY));//使用Cookies中间件并设置加密密钥为REOPHTMLKEY

//使用子路由
routes(app);

app.get("/",(req,res)=>{ //访问默认路径
    res.send("Reop Server");
})

// 错误中间件
app.use(errorhandler)


app.listen(port,()=>{ //监听端口
    console.log(`express Reop Server listening at http://localhost:${port}`);
})