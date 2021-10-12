const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())

app.use(express.urlencoded({extended: false}));
app.use(express.json());



const DB = {
    medicos: [ {
            id : 01, 
            name: 'Carlos', 
            specialty: 'Pediatra',
    },
    {
            id : 02, 
            name: 'Ramon', 
            specialty: 'Ortopedista',
    },
    {
            id : 03, 
            name: 'Fernando', 
            specialty: 'Cirurgiao',
}
]}

// retorna todos os médicos

app.get('/api/medicos', (request, response) => {
    response.json(DB.medicos);
});

// retorna um médico com ID

app.get('/api/medicos/id-medico', (req, res) => {
    const idMedi = req.params.id
    if(isNaN(idMedi)) {
        res.sendStatus(400);
        res.send('Opa, o id informado não é de um numero.');
    } else {
        const id = parseInt(idMedi)
        const medi = DB.medicos.find(index => index.id === id);
        if(medi !== undefined) {
            res.statusCode = 200;
            res.json(medi)
        }else {
            res.sendStatus(404)
        }
    }
});

// remove um registro de um médico

app.delete('/api/medico/id-medico', (req,res) => {
    const idMedi = req.params.id
    if(isNaN(idMedi)) {
        res.sendStatus(400);
        res.send('Opa, o id informado não é um numero.');
    } else {
        const id = parseInt(idMedi)
        const medi = DB.medicos.findIndex(index => index.id === id);
        if(medi === -1) {
            //usuario informou um id que nao existe. 
            res.sendStatus = 404;
        }else {
            DB.medicos.splice(medi, 1);
            res.sendStatus(200);
            res.json({message: 'Medico removido com sucesso'})
        }
    }
});

// salva um registro de um médico

app.post('/api/medico', (req,res) => {
 const { name, specialty} = req.body;
 DB.medicos.push({
     id: Math.floor(Math.random()* 10 + 1),
     name,
     specialty,
 });
 
 res.send({message: 'Novo registro criado com sucesso'});
});



/*app.listen(3000, () => {
    console.log('API RUNNING, http://localhost:3000');
});*/