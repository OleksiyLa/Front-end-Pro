const express = require('express');
const UserService = require('./Users.service')
const app = express();
const port = 7070;


app.use(express.static(__dirname + './../'));

app.all('*', (req, res, next)=>{
    console.log(req.method, req.originalUrl, new Date());
    next()
})

app.get('/person', UserService.getPersonData);
app.get('/person/name', UserService.getPersonName);
app.get('/person/address', UserService.getPersonAddress);
app.get('/person/post/recipient', UserService.getPersonRecipient);

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`)
});