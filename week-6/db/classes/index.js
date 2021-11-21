const client = require('../db')

const getAll = (request, response) =>{
    client.query('SELECT * FROM classes ORDER BY name DESC', (err, res) =>{
        if(!err) {
            response.status(200).json(res.rows);
        } else {
            console.log(err)
        }
    })
}

const getByName = (request, response) =>{
    const { name } = request.body

    // promise
    client
        .query('SELECT * FROM classes WHERE name = $1',[name])
        .then(res => response.status(200).json(res.rows))
        .catch(err => console.log(err))

}

const getClass = (request, response) =>{
    const { size, type, manager } = request.query
    switch (type) {
        case 'size': {
            client.query(`SELECT * FROM classes WHERE size > ${size} ORDER BY name DESC`, (err, res) =>{
                if(!err) {
                    response.status(200).json(res.rows);
                } else {
                    console.log(err)
                }
            })
        }
        break;
        case 'managernot': {  // !=
            client.query(`SELECT * FROM classes WHERE manager <> '${manager}'`, (err, res) =>{
                if(!err) {
                    response.status(200).json(res.rows);
                } else {
                    console.log(err)
                }
            })
        }
            break;
        case 'managerlist':
        case 'managerlistnot':    {
            const { managerlist } = request.body;   // ['ozan ulutaş', 'ışık ılık']
            let list = '('
            for (let i = 0; i < managerlist.length; i++) {
                if (managerlist.length - 1 === i) {
                    list +=  "'" + managerlist[i] + "' )"
                } else {
                    list +=  "'" + managerlist[i] + "', "
                }
            }

            const qstring = type === 'managerlist' ? 'IN' : 'NOT IN'
            console.log(qstring)
            client.query(`SELECT * FROM classes WHERE manager ${qstring} ${list}`, (err, res) =>{
                if(!err) {
                    response.status(200).json(res.rows);
                } else {
                    console.log(err)
                }
            })
        } /* WHERE manager = ali OR manager = ozan  */
            break;
        case 'costFirstDecrease':
        case 'costFirstIncrease':{
            const { costrange } = request.body;
            const sortType = type === 'costFirstDecrease' ? 'DESC' : 'ASC'
            client.query(`SELECT * FROM classes WHERE cost BETWEEN ${costrange[0]} AND ${costrange[1]} ORDER BY cost ${sortType}`, (err, res) =>{
                if(!err) {
                    response.status(200).json(res.rows);
                } else {
                    console.log(err)
                }
            })
        }
            break;
        default: {
            client.query(`SELECT * FROM classes`, (err, res) =>{
                if(!err) {
                    response.status(200).json(res.rows);
                } else {
                    console.log(err)
                }
            })
        }
        break;
    }
}

const create = (request, response) =>{
    const { size, cost,manager, usefull, name} = request.body

    client.query('INSERT INTO classes VALUES ($1, $2, $3, $4, $5)',
        [size, cost,manager, usefull, name] ,(err, res) =>{
            if(!err) {
                response.status(201).send(`class created`);
            } else {
                console.log(err)
            }
        })
}

const updateOne = (request, response)=>{

    let keys = Object.keys(request.body) // [ name, surname ... ]
    let values = Object.values(request.body) // [ ata, ... ]
    let str=""

    for (let i=0; i<keys.length; i++){
        if(i==keys.length-1){
            str+=`${keys[i]}=$${i+1}`
        }else{
            str+=`${keys[i]}=$${i+1}, `
        }
    }

    client.query(`UPDATE classes SET ${str} WHERE name=$1`, values, (err,res)=> {
        if (!err) {
            response.status(201).send(`classes updated`)
        }else{
            console.log(err)
        }
    })
}

const delByName = async (request, response) =>{
    const { name } = request.body
    // async await
    try {
        await client.query('DELETE FROM classes WHERE name = $1',[name])
        response.status(200).send(`classes successfully deleted`)
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    getAll,
    getClass,
    getByName,
    create,
    delByName,
    updateOne
}
