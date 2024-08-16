const productModel = require("../../models/productModel")//调用ueModel模块，与数据库进行通信

const ProductService = {
    getlist: async ({ id }) => {
        if (id) {
            return await productModel.findOne({ where: { id } })
        }
        console.log('[返回客户端产品数据]')
        return await productModel.findAll({ });
    }
}

module.exports = ProductService