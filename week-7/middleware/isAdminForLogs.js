const User = require('../models/user');
const Log = require('../models/log');

module.exports = async (req, res, next) => {
    let id = req.user.id
    if (!id) return res.status(401).json({message: 'Auth error'})
    try {
        const user = await User.findById(id)
        let requestBody = {...req.body}
        let path = req.path
        let baseUrl = req.baseUrl
        let hostname = req.hostname
        let originalUrl = req.originalUrl

        req.user.email = user.email
        req.user.role = user.role
        req.user.username = user.username
        req.user.age = user.age
        let isAdmin = user.role === 'admin'

        let log = new Log({
            requestBody,
            path,
            baseUrl,
            hostname,
            originalUrl, ...req.user,
            type: isAdmin ? 'valid' : 'invalid'
        })
        await log.save()

        if (!isAdmin) return res.status(401).json({message: 'You are not admin'})
        else next()
    } catch (e) {
        res.status(500).json({message: 'Invalid Token'})
    }
}
