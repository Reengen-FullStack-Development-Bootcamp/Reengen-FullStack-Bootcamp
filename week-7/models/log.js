const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
    requestBody: {
        type: Object,
    },
    path: String,
    baseUrl: String,
    hostname: String,
    originalUrl: String,
    id: String,
    email: String,
    role: {
        type: String,
        enum: {
            values: ['admin',  'editor', 'viewer','user'],
            message: '{VALUE} is not supported'
        },
        required: true
    },
    username: String,
    requestDate: {
        type: Date,
        default: Date.now()
    },
    type: {
        type: String,
        enum: {
            values: ['valid',  'invalid'],
            message: '{VALUE} is not supported'
        },
        default: 'valid'
    },
})

module.exports = mongoose.model('Log', logSchema)
