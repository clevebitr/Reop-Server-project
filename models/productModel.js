const DB = require('../model/dbconfig');//导入配置文件
const Sequelize = require('sequelize');//导入模块

//映射
const proModel = DB.define("product",{
    id:{//产品id
        primaryKey:true,//主键
        type:Sequelize.INTEGER,//数据类型INT
        field:"id",
        autoIncrement:true//自增
    },
    title:{//标题
        type:Sequelize.STRING(300),
        allowNull:false,
        defaultValue:'空',
        field:"title"
    },
    introduction:{//简介内容
        type:Sequelize.TEXT('long'),
        allowNull:false,
        field:"introduction"
    },
    summary:{//产品概述
        type:Sequelize.STRING(300),
        allowNull:false,
        defaultValue:'空',
        field:"summary"//1最新动态 2典型案例 3通知公告,
    },
    cover:{//封面
        type:Sequelize.STRING(500),
        allowNull:true,
        defaultValue:null,
        field:"cover"
    },
    editTime:{//编辑时间
        type:Sequelize.DATE,
        allowNull:false,
        // defaultValue:Date.now(),
        field:"editTime"
    }
})

module.exports = proModel;