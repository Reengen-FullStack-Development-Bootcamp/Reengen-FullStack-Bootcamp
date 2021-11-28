const router = require('express').Router();
const Log = require('../models/log')

router.get('/all', async (req, res) => {
    try {
        const logs = await Log.find()
        res.status(201).json({logs, LogsLength: logs.length})
    } catch (e) {
        res.send('me error')
    }
})

module.exports = router
