//adminapi传到的数据在这里处理

const UserService = require('../../service/admin/UserService')//处理完信息后service层负责对数据库进行操作
const JWT = require("../../util/JWT")//封装的JWT模块负责加/解密token

//封装方法UserController
const UserController = {
    //登录函数
    login: async (req, res) => {

        console.log('[用户传来的登录信息] ->', req.body)

        //调用UserService方法进行操作
        var result = await UserService.login(req.body)//传入用户发来的数据

        if (!result) {//返回值为假代表数据库中比对邮箱密码无符合项
            res.send({//返回错误信息
                code: 401,
                error: "用户名或密码错误"
            })
        } else {//数据库中存在符合项，登录成功
            //生成token
            const token = JWT.generate({
                _id: result.id,//token中存入基本用户数据，id,email
                _email: result.email
            }, "1d")//过期时间 1day
            res.header("Access-Control-Expose-Headers", "Authorization");//允许前端访问到Authorization
            res.header("Authorization", token)//向用户端发送生成的密钥
            res.send({//向用户端发送用户基本信息，存入store中，方便以后使用
                ActionType: "OK",
                data: {
                    id: result.id,
                    uname: result.uname,
                    email: result.email,
                    role: result.role,
                    introduction: result.introduction,
                    avatar: result.avatar
                }
            })
            console.log('[用户Token发送 🚀-> ]', token)
        }
    },

    //更新用户数据函数
    upload: async (req, res) => {


        const { uname, introduction } = req.body//数据处理，取得名称，简介信息

        //判断用户上传的头像，如果未更新头像，将avatar变量赋值空字符串
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ""
        const token = req.headers['authorization'].split(' ')[1];//获取用户端token
        var payload = JWT.verify(token)//解密用户端token，获得用户数据

        console.log("[用户id] -> ", payload._id)

        //调用userService方法更新
        await UserService.upload({ id: payload._id, uname, introduction, avatar })
        if (avatar) {//判断用户头像是否更新
            console.log('[用户更新头像] -> ', avatar)
            res.send({//用户头像更新，发送头像链接
                ActionType: "OK",
                data: {
                    uname,
                    introduction,
                    avatar
                }
            })
        } else {//用户并未更新头像，不需要发送avatar信息
            console.log('[用户未更新头像，但更新了其他信息]')
            res.send({
                ActionType: "OK",
                data: {
                    uname,
                    introduction,
                }
            })
        }
    },

    add: async (req, res) => {


        const { uname, introduction, role, email, upwd } = req.body//数据处理，取得名称，简介信息

        //判断用户上传的头像，如果未更新头像，将avatar变量赋值空字符串
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ""

        //调用userService方法更新
        const userinfo = await UserService.add({ uname, introduction, avatar, upwd, role: Number(role), email })
        if (userinfo) {
            res.send({
                ActionType: "OK",
            })
        } else {
            res.send({
                ActionType: "NO",
                Messafe: "用户已存在"
            })
        }
    },

    
    putList:async (req,res)=>{
        await UserService.putList(req.body)
        res.send({
            ActionType:"OK"
        })
    },

    getlist: async (req,res) => {

        const result = await UserService.getlist(req.params)
        res.send({
            ActionType: 'OK',
            data: result
        })
    },

    delList:async(req,res)=>{
        console.log("[id]",req.params.id)
        await UserService.delList(req.params)
        res.send({
            ActionType:'OK'
        })
    }
}

module.exports = UserController