const NewsService = require("../../service/web/NewsService")

const NewsController = {
    getlist: async (req, res) => {
        const result = await NewsService.getlist(req.params)
        res.send({
            ActionType: 'OK',
            data: result
        })
    }
}


module.exports = NewsController