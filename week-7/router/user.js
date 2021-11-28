const router = require('express').Router();
const {check, validationResult} = require('express-validator/check')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

router.post('/singup',
    [
        check("username", "username is not valid")
            .not()
            .isEmpty(),
        check("email", "email is not valid").isEmail(),
        check("password", "password is not valid, it must be min 6 length").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const {username, email, password, age, role} = req.body       // password = 12345678  => afregfsgsrtarettf.

        try {
            user = new User({username, email, password, age, role})
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)  // x-access-token

            await user.save();

            const payload = {
                user: {
                    id: user.id,
                }
            }
            jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 10000}, (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    token
                })  // "token": "sggqergtjuj75u7"
            })

        } catch (e) {
            console.error(e.message)
            res.status(500).send('Error in saving')
        }

    }
)

router.post('/signin',
    [
        check("email", "email is not valid").isEmail(),
        check("password", "password is not valid, it must be min 6 length").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const {email, password} = req.body
        try {
            let user = await User.findOne({email})

            if (!user) {
                return res.status(400).send('user not exist')
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).send('Incorrect password')
            }
            const payload = {
                user: {
                    user: user.id
                }
            }

            jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 10000}, (err, token) => {
                if (err) throw err;
                res.status(200).json({token})
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({
                message: e
            })
        }
    }
)

router.get('/me', async (req, res) => {
    try {
        const user = await User.findById(req.body.id)
        res.status(201).json({user})
    } catch (e) {
        res.send('me error')
    }
})

module.exports = router
