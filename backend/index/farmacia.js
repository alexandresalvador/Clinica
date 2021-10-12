const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())

app.use(express.urlencoded({extended: false}));
app.use(express.json());



const DB = {
    farmacias: [ {
            id : 01, 
            name: 'Sao Pedro', 
            idPaciente: 01 ,
            idmedico: 01 ,
    },
    {
            id : 02, 
            name: 'Panvel', 
            idPaciente: 02 ,
            idmedico: 02 ,
    },
    {
            id : 03, 
            name: 'Joinville', 
            idPaciente: 02 ,
            idmedico: 02 ,
}
]}

// retorna todos as farmacias

app.get('/api/farmacia', (request, response) => {
    response.json(DB.farmacias);
});

// retorna uma farmacia pelo ID

app.get('/api/farmacia/id-farmacia', (req, res) => {
    const idFarm = req.params.id
    if(isNaN(idFarm)) {
        res.sendStatus(400);
        res.send('Opa, o id informado não é de um numero.');
    } else {
        const id = parseInt(idFarm)
        const farm = DB.farmacias.find(index => index.id === id);
        if(farm !== undefined) {
            res.statusCode = 200;
            res.json(farm)
        }else {
            res.sendStatus(404)
        }
    }
});

// remove um registro de uma farmacia

app.delete('/api/farmacia/id-farmacia', (req,res) => {
    const idFarm = req.params.id
    if(isNaN(idFarm)) {
        res.sendStatus(400);
        res.send('Opa, o id informado não é um numero.');
    } else {
        const id = parseInt(idFarm)
        const farm = DB.farmacias.findIndex(index => index.id === id);
        if(farm === -1) {
            //usuario informou um id que nao existe. 
            res.sendStatus = 404;
        }else {
            DB.farmacias.splice(farm, 1);
            res.sendStatus(200);
            res.json({message: 'Medico removido com sucesso'})
        }
    }
});

// salva um registro de uma farmacia

app.post('/api/farmacia', (req,res) => {
 const { name, idPaciente, idmedico} = req.body;
 DB.farmacias.push({
     id: Math.floor(Math.random()* 10 + 1),
     name,
     idPaciente,
     idmedico,
 });
 
 res.send({message: 'Novo registro criado com sucesso'});
});

