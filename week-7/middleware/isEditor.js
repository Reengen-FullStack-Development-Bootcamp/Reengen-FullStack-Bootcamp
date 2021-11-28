const User = require('../models/user');
const Log = require('../models/log');

module.exports = async (req, res, next) => {
    let id = req.user.id
    if(!id) return res.status(401).json({ message: 'Auth error'})
    try {
        const user = await User.findById(id)
        let requestBody = {...req.body}
        let path = req.path

        req.user.email = user.email
        req.user.role = user.role
        req.user.username = user.username
        req.user.age = user.age

        if (!['admin', 'editor'].includes(user.role)) {
            let log = new Log({requestBody, path, ...req.user, type: 'invalid' })
            await log.save()
            return res.status(401).json({message: 'unauthorized req'})
        }
        else next()
    } catch (e) {
        res.status(500).json({ message: 'Invalid Token'})
    }
}
