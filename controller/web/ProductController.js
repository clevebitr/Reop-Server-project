const ProductService = require("../../service/web/ProductService")

const ProductController = {
    getlist: async (req, res) => {
        const result = await ProductService.getlist(req.params)
        res.send({
            ActionType: 'OK',
            data: result
        })
    }
}


module.exports = ProductController