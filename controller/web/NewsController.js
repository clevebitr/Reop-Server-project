const NewsService = require("../../service/web/NewsService")

const NewsController = {
    getlist: async (req, res) => {
        const result = await NewsService.getlist(req.params)
        res.send({
            ActionType: 'OK',
            data: result
        })
    },
    getToplist: async (req, res) => {
        const limit = req.query.limit
        const result = await NewsService.getToplist({limit:Number(req.query.limit)})
        res.send({
            ActionType: 'OK',
            data: result
        })
    },
}


module.exports = NewsController