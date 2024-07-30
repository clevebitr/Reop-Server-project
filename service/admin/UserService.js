//adminapi/user/传来的数据在这里进行处理，返回到UserController 

//const { putList } = require("../../controller/admin/UserController");
const ueModel = require("../../models/ueModel")//调用ueModel模块，与数据库进行通信


//定义UserService方法
const UserService = {
    login: async ({ email, upwd }) => {//login函数
        return ueModel.findOne({//在数据库中查找对应的邮箱，密码。返回到UserController
            where: {//查找条件
                email,
                upwd
            }
        })
    },

    //更新用户数据函数
    upload: async ({ id, uname, avatar, introduction }) => {
        if (avatar) {//如果用户上传了头像，更新头像
            const user = await ueModel.findOne({ where: { id } });//根据传来的用户id查找对应用户
            if (user) {//存在对应用户
                return user.update({ uname, avatar, introduction });
            }
        } else {//用户并未上传头像，不更新数据
            const user = await ueModel.findOne({ where: { id } });//根据传来的用户id查找对应用户
            if (user) {//存在对应用户
                return user.update({ uname, introduction });
            }
        }
    },

    add: async ({ uname, introduction, avatar, upwd, role, email }) => {
        const user = await ueModel.findOne({ where: { email } });
        if (user) {
            return false
        }
        return await ueModel.create({ uname, upwd, email, role, introduction, avatar });
    },

    putList:async(body)=>{
        const{id,uname,upwd,email,role,introduction} = body;
        const user =  await ueModel.findOne({where:{id}});
        return await user.update({uname,upwd,email,role,introduction});
    },

    getlist:async({id})=>{
        if (id) {
            return await ueModel.findOne({ where: { id } })
        }
        return await ueModel.findAll({attributes: ['uname', 'email','introduction','role','avatar','id']});
    },

    delList:async({id})=>{
        return await ueModel.destroy({where:{id}});
    }
}

module.exports = UserService