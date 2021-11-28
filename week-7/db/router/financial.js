const client = require('../db')

const getAll = (request, response) => {
    client.query('SELECT * FROM financial ORDER BY buget DESC',(err, result) => {
        if (!err) {
            response.status(200).json(result.rows)
        } else {
            console.log('get all error: ' + err)
        }
    })
}

module.exports = {
    getAll
}
