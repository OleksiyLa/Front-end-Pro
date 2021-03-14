const express = require('express');
const bodyParser = require('body-parser')
const UserService = require('./Users.service');
const logService = require('./log.service')

const app = express();
const port = 7070;

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(bodyParser.text())
app.use(express.static(__dirname + './../'));

app.all('*', logService.logMiddleware)
app.get('/users', UserService.getUsers);
app.get('/users/all', UserService.getUsersAll);
app.get('/users/:name', UserService.getUsersByName);
app.post('/users/add', UserService.addUser);
app.put('/users/update', UserService.updateUserById);
app.delete('/users/remove/all', UserService.removeAllUsers);
app.delete('/users/remove/:id', UserService.removeUserById);
app.get('/get/log', logService.logReader);

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`)
});