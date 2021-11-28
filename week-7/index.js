const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const log = require('./middleware/log')
const auth = require('./middleware/auth')
const isAdmin =require('./middleware/isAdmin')
const isAdminForLogs = require('./middleware/isAdminForLogs')
const isEditor = require('./middleware/isEditor')
const db = require('./db/index')
const user = require('./router/user')
const logs = require('./router/logs')

const app = express()
app.use(cors())
app.use(express.urlencoded({extended: true}))

app.use('/user', user)
app.get('/financial', auth, isAdmin, db.financial.getAll)
app.get('/employes', auth, isEditor, log, db.employes.getAll)
app.use('/logs', auth, isAdminForLogs, logs)

dotenv.config()

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, err => {
    if (err) {
        console.error(err);
    } else {
        console.log('connect to database')
    }
})

app.listen(process.env.PORT, err => {
    if (err) {
        console.error(err);
    } else {
        console.log(process.env.PORT + ' listening ...')
    }
})
