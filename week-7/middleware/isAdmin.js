const User = require('../models/user');
const Log = require('../models/log')
module.exports = async (req, res, next) => {
    let id = req.user.user
    if(!id) return res.status(401).json({ message: 'Auth error'})
    try {
        const user = await User.findById(id)
        //console.log(user.role)
        if (user.role !== 'admin') return res.status(401).json({ message: 'You are not admin'})
        else next()
    } catch (e) {
        res.status(500).json({ message: 'Invalid Token'})
    }
}
