//adminapi传到的数据在这里处理

const UserService = require('../../service/admin/UserService')
const JWT = require("../../util/JWT")

const UserController = {
    login:async(req,res)=>{
        //req.body
        //res.data
        console.log(req.body)
        var result = await UserService.login(req.body)

        if (!result) {
            res.send({
                code:401,
                error:"用户名或密码错误"
            })
        }else{
            //生成token
            const token = JWT.generate({
                _id:result.id,
                _email:result.email
            },"10s")
            res.header("Access-Control-Expose-Headers","Authorization");//允许前端访问到Authorization
            res.header("Authorization",token)

            res.send({
                ActionType:"OK",
                data:{
                    id:result.id,
                    uname:result.uname,
                    email:result.email,
                    role:result.role,
                    introduction:result.introduction
                }
            })
        }
    }
}

module.exports = UserController