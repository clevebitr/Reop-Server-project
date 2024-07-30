const neModel = require("../../models/neModel")//调用ueModel模块，与数据库进行通信

const NewsService = {
    add: async ({ title, content, category, isPublish, cover, editTime }) => {
        //console.log(title, content, category, isPublish, cover, editTime)
        console.log('[客户端上传新闻数据]')
        return await neModel.create({ title, content, category, cover, isPublish, editTime });
        //console.log('数据库内容处理')
    },

    getlist: async ({ id }) => {
        if (id) {
            return await neModel.findOne({ where: { id } })
        }
        console.log('[返回客户端新闻数据]')
        return await neModel.findAll({ attributes: ['title', 'content', 'category', 'cover', 'isPublish', 'id', 'editTime'] });
    },

    publish: async ({ id, title, content, category, cover, isPublish, editTime }) => {
        const news = await neModel.findOne({ where: { id } });//根据传来的用户id查找对应新闻
        if (cover) {//如果用户上传了头像，更新头像
            if (news) {//存在对应id新闻
                return news.update({ title, content, category, cover, isPublish, editTime });
            }
        } else {//用户并未上传头像，不更新数据
            if (news) {//存在对应id新闻
                return news.update({ title, content, category, isPublish, editTime });;
            }
        }
    },

    delList:async({id})=>{
        return await neModel.destroy({where:{id}});
    }
}

module.exports = NewsService