const express = require("express");
const app = express();//实例化express
const routes = require("./routes");//路由
const port = 3000;//运行端口
// var cookieParser = require('cookie-parser');//Cookies
// var logger = require('morgan');//日志
const cors = require('cors');//跨域
const errorhandler = require('./middleware/errorhandler')//错误中间件
const webNewsRoute = require("./routes/web/NewsRoter")
const webProductRoute = require("./routes/web/ProductRouter")

var path = require('path')//静态资源
const JWT = require("./util/JWT");//封装的Token生成函数
const { request } = require("http");
const SECRET_KEY = 'REOPHTMLKEY';// tokenkey

//跨域中间件
app.use(cors());
//静态资源文件夹
app.use(express.static(path.join(__dirname, 'public')))

app.use("/webapi/news/",webNewsRoute)//新闻接口暴露给外部
app.use("/webapi/product/",webProductRoute)//产品接口暴露给外部

//路由中间件，只有登录api放行，其他api需要验证用户token
app.use((req, res, next) => {
    //放行login api
    if (req.url === "/adminapi/user/login") {
        next()
        return
    }

    //获取用户token
    if (!req.headers['authorization']) {
        console.log("[用户未上传token]")
        res.status(401).send({
            code: '401',
            errInfio: "请登录"
        })
    } else {
        const token = req.headers['authorization'].split(' ')[1];
        console.log("[客户端上传Token] -> " + token)
        if (token) {//用户token存在
            var payload = JWT.verify(token)//解密token并验证有效性
            console.log("[客户端解密Token数据为] -> ", payload)
            if (payload) {//解密的用户数据是否存在
                //生成token
                const newToken = JWT.generate({//重新根据解密出的用户数据生成一个新的Token
                    _id: payload._id,
                    _email: payload._email
                }, "1d")//有效期1day

                res.header("Access-Control-Expose-Headers", "Authorization");//允许前端访问到Authorization
                res.header("Authorization", newToken)//根据新的Token,设置新的Authorization头

                next()//放行
                console.log("[用户Token刷新,🚀 -> ] ", newToken)
            } else {//token验证不通过
                console.log("[未知token]")
                res.status(401).send({
                    code: '401',
                    errInfio: "未知token"
                })
            }
        }
    }
})

//路由加载前使用中间件
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //使用express.json中间件处理post到的json数据

// app.use(cookieParser(SECRET_KEY));//使用Cookies中间件并设置加密密钥为REOPHTMLKEY

//使用子路由
routes(app);

// 错误中间件
app.use(errorhandler)


app.listen(port, () => { //监听端口
    console.log(`[express Reop Server listening at http://localhost:${port}]`);
})