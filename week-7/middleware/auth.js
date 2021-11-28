const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    const token = req.header('token')
    if(!token) return res.status(401).json({ message: 'Auth error'})
    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        req.user = {id: decoded.user.user}
        console.log(req.user)
        next()
    } catch (e) {
        res.status(500).json({ message: 'Invalid Token'})
    }
}
