const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())

app.use(express.urlencoded({extended: false}));
app.use(express.json());


const DB = {
    pacientes: [ {
            id : 01, 
            name: 'Marta', 
            doenca: 'dores nas juntas',

    },
    {
            id : 02, 
            name: 'André', 
            doenca: 'osteoporose',
    },
    {
            id : 03, 
            name: 'Josias', 
            doenca: 'gastrite',
}
]}

// retorna todos os pacientes

app.get('/api/pacientes ', (request, response) => {
    response.json(DB.pacientes);
});

// retorna um paciente com ID

app.get('/api/paciente/id-paciente', (req, res) => {
    const idPaci = req.params.id
    if(isNaN(idPaci)) {
        res.sendStatus(400);
        res.send('Opa, o id informado não é de um numero.');
    } else {
        const id = parseInt(idPaci)
        const paci = DB.pacientes.find(index => index.id === id);
        if(paci !== undefined) {
            res.statusCode = 200;
            res.json(paci)
        }else {
            res.sendStatus(404)
        }
    }
});

// remove um registro de um paciente

app.delete('/api/paciente/id-paciente', (req,res) => {
    const idPaci = req.params.id
    if(isNaN(idPaci)) {
        res.sendStatus(400);
        res.send('Opa, o id informado não é um numero.');
    } else {
        const id = parseInt(idPaci)
        const paci = DB.pacientes.findIndex(index => index.id === id);
        if(paci === -1) {
            //usuario informou um id que nao existe. 
            res.sendStatus = 404;
        }else {
            DB.pacientes.splice(paci, 1);
            res.sendStatus(200);
            res.json({message: 'Paciente removido com sucesso'})
        }
    }
});

// salva um registro de um paciente

app.post('/api/paciente', (req,res) => {
 const { name, doenca} = req.body;
 DB.pacientes.push({
     id: Math.floor(Math.random()* 10 + 1),
     name,
     doenca,
 });
 
 res.send({message: 'Novo registro criado com sucesso'});
});

