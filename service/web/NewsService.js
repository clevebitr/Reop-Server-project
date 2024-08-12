const neModel = require("../../models/neModel")//调用ueModel模块，与数据库进行通信

const NewsService = {
    getlist: async ({ id }) => {
        if (id) {
            return await neModel.findOne({ where: { id , isPublish:1 } })
        }
        console.log('[返回客户端新闻数据]')
        return await neModel.findAll({ 
            where: {
                isPublish:1
            },
            order: [
                // 将转义 editTime 并针对有效方向列表进行降序排列
                ['editTime', 'DESC'],
            ]
        });
    }
}

module.exports = NewsService