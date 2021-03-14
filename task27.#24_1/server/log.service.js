const fs = require('fs');
const { setInterval } = require('timers');
const LOG_FILE_PATH = './logs/logs.txt';
const start = Date.now();

function logMiddleware(req, res, next){
    console.log(req.method, req.originalUrl, Date());

    fs.appendFile(LOG_FILE_PATH, `${req.method}, ${req.originalUrl}, ${Date()}\n`, (err)=>{
        if(err){
            console.log(err)
        }
    })

    next();
}

function logReader(req, res){
    fs.readFile(LOG_FILE_PATH, (err, data)=>{
        if(err){
            console.log(err);
            return
        }
        res.send(data)
    })
}

setInterval(()=>{
    fs.appendFile(LOG_FILE_PATH, `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} ${Date.now() - start}ms\n`, (err)=>{
        if(err){
            console.log(err)
        }
    })
}, 5000);

module.exports = {
    logMiddleware,
    logReader
}