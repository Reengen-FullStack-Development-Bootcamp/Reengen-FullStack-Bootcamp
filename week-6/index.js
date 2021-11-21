const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/index.js')
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) =>{
    res.json({info: 'inital route'})
})

app.get('/students', db.students.getAll)
app.post('/student', db.students.getByName)
app.delete('/students', db.students.delByName)
app.post('/students', db.students.create)
app.put('/students', db.students.update)
app.post('/studentone', db.students.updateOne)
// app.patch('/students', db.updateStudent)

app.get('/classes', db.classes.getAll)
app.post('/classes', db.classes.create)
app.get('/class', db.classes.getClass)
app.get('/classone', db.classes.getByName)
app.put('/classes', db.classes.updateOne)
app.delete('/classes', db.classes.delByName)

app.listen(8080, () =>{
    console.log('port 8080 listening ...')
});
