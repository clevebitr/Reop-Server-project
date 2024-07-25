//adminapi/user/传来的数据在这里进行处理，返回到UserController 

const ueModel = require("../../models/ueModel")

const UserService = {
    login:async({email,upwd})=>{
        return ueModel.findOne({
            where:{
                email,
                upwd
            }
        })
    }
}

module.exports = UserService