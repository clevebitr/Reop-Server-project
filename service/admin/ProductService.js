const proModel = require("../../models/productModel")//调用ueModel模块，与数据库进行通信

const ProductService = {
    add: async ({ title, summary, introduction, cover, editTime }) => {
        //console.log(title, content, category, isPublish, cover, editTime)
        console.log('[客户端上传产品数据]')
        return await proModel.create({ title, summary, introduction, cover, editTime });
        //console.log('数据库内容处理')
    },

    getlist: async ({ id }) => {
        if (id) {
            return await proModel.findOne({ where: { id } })
        }
        console.log('[返回客户端产品数据]')
        return await proModel.findAll({ attributes: ['title', 'summary', 'introduction', 'cover', 'id', 'editTime'] });
    },

    delList: async ({ id }) => {
        return await proModel.destroy({ where: { id } });
    },

    upload: async ({ id, title, cover, summary, introduction, editTime }) => {
        const product = await proModel.findOne({ where: { id } });//根据传来的用户id查找对应用户
        if (product) {
            if (cover) {//如果用户上传了img，更新img
                console.log('[产品更新封面] -> ', cover)
                return product.update({ title, cover, summary, introduction, editTime });
            } else {//用户并未上传img，不更新img数据
                console.log('[产品封面未更新，但更新了其他信息]')
                return product.update({ title, summary, introduction, editTime });
            }
        }
    },
}

module.exports = ProductService