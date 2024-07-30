const DB = require('../model/dbconfig');//导入配置文件
const Sequelize = require('sequelize');//导入模块

//映射
const neModel = DB.define("news",{
    id:{//文章id
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
    content:{//文章内容
        type:Sequelize.TEXT('long'),
        allowNull:false,
        field:"content"
    },
    category:{//文章类型标识
        type:Sequelize.INTEGER,
        allowNull:false,
        defaultValue:1,
        field:"category"//1最新动态 2典型案例 3通知公告,
    },
    isPublish:{//文章类型标识
        type:Sequelize.INTEGER,
        allowNull:false,
        defaultValue:0,
        field:"isPublish"//0不发布 1发布
    },
    cover:{//文章封面
        type:Sequelize.STRING(500),
        allowNull:true,
        defaultValue:null,
        field:"cover"
    },
    editTime:{//文章编辑时间
        type:Sequelize.DATE,
        allowNull:false,
        // defaultValue:Date.now(),
        field:"editTime"
    }
})

module.exports = neModel;