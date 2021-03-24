const express = require('express');
const bodyParser = require('body-parser')
const APIService = require('./APIService')

const app = express();
const port = 7070;

app.use(bodyParser.json());

app.post('/data/update', APIService.addArray);
app.get('/data/status-check', APIService.getUserData);

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`)
});