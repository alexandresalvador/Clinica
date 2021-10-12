const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())

app.use(express.urlencoded({extended: false}));
app.use(express.json());



const DB = {
    medicamentos: [ {
            id : 01, 
            name: 'paracetamol', 
            posologia: 'duas',

    },
    {
            id : 02, 
            name: 'metformina', 
            posologia: 'quatro',
    },
    {
            id : 03, 
            name: 'omeprazol', 
            posologia: 'uma',
}
]}

// retorna todos os medicamentos

app.get('/api/medicamentos ', (request, response) => {
    response.json(DB.medicamentos);
});

// retorna um medicamento com ID

app.get('/api/medicamento/id-medicamento', (req, res) => {
    const idMedi = req.params.id
    if(isNaN(idMedi)) {
        res.sendStatus(400);
        res.send('Opa, o id informado não é de um numero.');
    } else {
        const id = parseInt(idMedi)
        const medi = DB.medicamentos.find(index => index.id === id);
        if(medi !== undefined) {
            res.statusCode = 200;
            res.json(medi)
        }else {
            res.sendStatus(404)
        }
    }
});

// remove um registro de um medicamento

app.delete('/api/medicamento/id-medicamento', (req,res) => {
    const idMedi = req.params.id
    if(isNaN(idMedi)) {
        res.sendStatus(400);
        res.send('Opa, o id informado não é um numero.');
    } else {
        const id = parseInt(idMedi)
        const medi = DB.medicamentos.findIndex(index => index.id === id);
        if(medi === -1) {
            //usuario informou um id que nao existe. 
            res.sendStatus = 404;
        }else {
            DB.medicamentos.splice(medi, 1);
            res.sendStatus(200);
            res.json({message: 'Medicamento removido com sucesso'})
        }
    }
});

// salva um registro de um medicamento

app.post('/api/medicamento', (req,res) => {
 const { name, posologia} = req.body;
 DB.medicamentos.push({
     id: Math.floor(Math.random()* 10 + 1),
     name,
     posologia,
 });
 
 res.send({message: 'Novo medicamento criado com sucesso'});
});

