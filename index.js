const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient } = require('mongodb'); 

let user = [];
let db = ''
app.use(cors())
app.use(express.json());

async function mongoConnect() {
    let client = new MongoClient('mongodb+srv://kalathilgeorgeantony:9RTLTvh1VZ11ORRR@bigdata.68y9vlb.mongodb.net/?retryWrites=true&w=majority&appName=BigData');
    await client.connect();
    db = client.db('sample_mflix');
    ;
 }

 app.get('/user', async function (req, res) {
    let userdb = db.collection('users')
    let output = await userdb.find({}).toArray();
    res.json(output);
 });

app.post('/register', async function(req, res) {
    let output = await db.collection('user').insertOne(req.body);
    console.log(req.body);
})

app.post('/calculate', function (req, res) {
    let num1 = req.body.num1;
    let num2 = req.body.num2;
    let op = req.body.op;


    console.log('juhygygttfytyftyfytf',req.body);
    let result;

    if(op == 'add') {
     result = num1 + num2;
    } else if(op == 'sub') {
        result = num1 - num2;
    }else if(op == 'mul') {
        result = num1 * num2;
    } else if(op == 'div') {
        result = num1 / num2;
    }
    res.json(result);
});

app.listen(2000, function() {
console.log('server listening on port 2000');
mongoConnect();
})