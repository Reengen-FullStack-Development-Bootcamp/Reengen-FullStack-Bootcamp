const Log = require('../models/log')
module.exports = async (req, res, next) => {
    try {
        console.log(req.user)
        let requestBody = {...req.body}
        let path = req.path
        let log = new Log({requestBody, path, ...req.user })
        await log.save()
        next()
    } catch (e) {
        console.log(e)
        res.send('log module error')
    }
}
