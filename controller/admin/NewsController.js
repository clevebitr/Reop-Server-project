const NewsService = require("../../service/admin/NewsService")

const NewsController = {
    add: async (req, res) => {
        // console.log(req.body)
        // console.log(req.file)
        const cover = req.file ? `/newsuploads/${req.file.filename}` : ""
        const { title, content, category, isPublish } = req.body
        await NewsService.add({
            title,
            content,
            category: Number(category),
            isPublish: Number(isPublish),
            cover,
            editTime: new Date()
        })
        res.send(
            {
                ActionType: "OK"
            }
        )
    },

    //更新用户数据函数
    updateList: async (req, res) => {
        const { id, title, content, category } = req.body//数据处理

        //判断用户上传的img，如果未更新，将avatar变量赋值空字符串
        const cover = req.file ? `/newsuploads/${req.file.filename}` : ""

        //调用NewsService方法更新
        await NewsService.upload({ id, title, cover, content, category, editTime: new Date() })
        res.send({
            ActionType: "OK"
        })
    },

    getlist: async (req, res) => {
        const result = await NewsService.getlist(req.params)
        res.send({
            ActionType: 'OK',
            data: result
        })
    },

    publish: async (req, res) => {
        await NewsService.publish({
            ...req.body,
            editTime: new Date()
        })
        res.send({
            ActionType: "OK"
        })
    },

    delList: async (req, res) => {
        console.log("[id]", req.params.id)
        await NewsService.delList(req.params)
        res.send({
            ActionType: 'OK'
        })
    }
}


module.exports = NewsController