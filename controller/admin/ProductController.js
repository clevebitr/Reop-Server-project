const ProductService = require("../../service/admin/ProductService")

const ProductController = {
    add: async (req, res) => {
        // console.log(req.body)
        // console.log(req.file)
        const cover = req.file ? `/productuploads/${req.file.filename}` : ""
        const { title, summary, introduction} = req.body
        await ProductService.add({
            title,
            summary,
            introduction,
            cover,
            editTime: new Date()
        })
        res.send(
            {
                ActionType: "OK"
            }
        )
    },

    getlist: async (req, res) => {
        const result = await ProductService.getlist(req.params)
        res.send({
            ActionType: 'OK',
            data: result
        })
    },

    delList: async (req, res) => {
        //console.log("[id]", req.params.id)
        await ProductService.delList(req.params)
        res.send({
            ActionType: 'OK'
        })
    },

    updateList: async (req, res) => {
        const { id, title, summary, introduction } = req.body//数据处理

        //判断用户上传的img，如果未更新，将avatar变量赋值空字符串
        const cover = req.file ? `/productuploads/${req.file.filename}` : ""

        //调用NewsService方法更新
        await ProductService.upload({ id, title, cover, summary, introduction, editTime: new Date() })
        res.send({
            ActionType: "OK"
        })
    },
}


module.exports = ProductController