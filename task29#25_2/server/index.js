const express = require('express');
const bodyParser = require('body-parser')
const APIService = require('./APIService')

const app = express();
const port = 7070;

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(express.static(__dirname + './../'));
app.all('*', APIService.createFiles)


app.post('/data/update', APIService.addArray);
app.get('/data/status-check', APIService.getStatData);
app.get('/data/get', APIService.getData);

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`)
});