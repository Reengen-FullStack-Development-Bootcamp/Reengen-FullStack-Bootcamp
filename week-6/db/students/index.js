const client = require('../db')

const getAll = (request, response) =>{
    client.query('SELECT * FROM students', (err, res) =>{
        if(!err) {
            response.status(200).json(res.rows);
        } else {
            console.log(err)
        }
    })
}

const getByName = (request, response) =>{
    const { name } = request.body
    client.query('SELECT * FROM students WHERE name = $1',[name] ,(err, res) =>{
        if(!err) {
            response.status(200).json(res.rows);
        } else {
            console.log(err)
        }
    })
}

const create = (request, response) =>{
    const { name, surname, age, location, depresion, salary} = request.body

    client.query('INSERT INTO students VALUES ($1, $2, $3, $4, $5, $6)',
        [name, surname, age, location, depresion, salary] ,(err, res) =>{
            if(!err) {
                response.status(201).send(`user ${name} ${surname} created`);
            } else {
                console.log(err)
            }
        })
}

const update = (request, response) =>{
    const { name, surname, age, location, depresion,  salary} = request.body

    client.query('UPDATE students SET name = $1, surname= $2, age= $3, location= $4, depresion= $5,  salary= $6 WHERE name = $1',
        [name, surname, age, location, depresion, salary] ,(err, res) =>{
            if(!err) {
                response.status(200).send(`user ${name} ${surname} updated`);
            } else {
                console.log(err)
            }
        })

    client.end;
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

    client.query(`UPDATE students SET ${str} WHERE name=$1`, values, (err,res)=> {
        if (!err) {
            response.status(201).send(`user updated`)
        }else{
            console.log(err)
        }
    })
}

const delByName = async (request, response) =>{

    // callback
    const { name } = request.body
    client.query('DELETE FROM students WHERE name = $1',[name] ,(err, res) =>{
        if(!err) {
            response.status(200).send(`user successfully deleted`);
        } else {
            console.log(err)
        }
    })

    // promise
    // client
    //     .query('DELETE FROM students WHERE name = $1',[name])
    //     .then(response => response.status(200).send(`user successfully deleted`))
    //     .catch(err => console.log(err))
    //
    // // async await
    // try {
    //     const response = await client.query('DELETE FROM students WHERE name = $1',[name])
    //     response.status(200).send(`user successfully deleted`)
    // } catch (err) {
    //     console.log(err)
    // }

}

module.exports = {
    getAll,
    getByName,
    create,
    update,
    delByName,
    updateOne
}
