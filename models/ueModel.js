const DB = require('../model/dbconfig');//导入配置文件
const Sequelize = require('sequelize');//导入模块

//映射
const ueModel = DB.define("users",{
    id:{//用户id
        primaryKey:true,//主键
        type:Sequelize.INTEGER,//数据类型INT
        field:"id",
        autoIncrement:true//自增
    },
    uname:{//用户名
        type:Sequelize.STRING(30),
        allowNull:false,
        defaultValue:'空',
        field:"uname"
    },
    upwd:{//用户密码
        type:Sequelize.STRING(20),
        allowNull:false,
        defaultValue:'123456',
        field:"upwd"
    },
    email:{////用户邮箱
        type:Sequelize.STRING(50),
        defaultValue:null,
        field:"email"
    },
    role:{//权限标识
        type:Sequelize.INTEGER,
        allowNull:false,
        defaultValue:0,
        field:"role"//管理员1，编辑2
    },
    introduction:{//用户简介
        type:Sequelize.STRING(500),
        allowNull:true,
        defaultValue:null,
         field:"introduction"
    },
    avatar:{//用户头像
        type:Sequelize.STRING(500),
        allowNull:true,
        defaultValue:null,
         field:"avatar"
    }
})

module.exports = ueModel;