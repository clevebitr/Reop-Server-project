const neModel = require("../../models/neModel")//调用ueModel模块，与数据库进行通信

const NewsService = {
    add: async ({ title, content, category, isPublish, cover, editTime }) => {
        //console.log(title, content, category, isPublish, cover, editTime)
        console.log('[客户端上传新闻数据]')
        return await neModel.create({ title, content, category, cover, isPublish, editTime });
        //console.log('数据库内容处理')
    },

    upload: async ({ id, title, cover, content, category, editTime }) => {
        const news = await neModel.findOne({ where: { id } });//根据传来的用户id查找对应用户
        if (news) {
            if (cover) {//如果用户上传了img，更新img
                console.log('[新闻更新封面] -> ', cover)
                return news.update({ title, cover, content, category, editTime });
            } else {//用户并未上传img，不更新img数据
                console.log('[新闻封面未更新，但更新了其他信息]')
                return news.update({ title, content, category, editTime });
            }
        }
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
                return news.update({ title, content, category, cover, isPublish });
            }
        } else {//用户并未上传头像，不更新数据
            if (news) {//存在对应id新闻
                return news.update({ title, content, category, isPublish });;
            }
        }
    },

    delList: async ({ id }) => {
        return await neModel.destroy({ where: { id } });
    }
}

module.exports = NewsService