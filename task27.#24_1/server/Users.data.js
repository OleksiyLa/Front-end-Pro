const fs = require('fs');
const BD_PATH = './mocks/users/users.json';

let users;

fs.readFile(BD_PATH, (err, data)=>{
    if(err){
        console.log(err);
        users = [];
        fs.writeFile(BD_PATH, JSON.stringify(users), console.log);
        return
    } 
    users = JSON.parse(data);
})

function getUsers(){
    return users;
}

function updateUsers(newUsers){
    const promise = new  Promise((resolve,reject)=>{
        fs.writeFile(BD_PATH, JSON.stringify(newUsers), (err)=>{
            if(err){
                reject(err);
                return
            }
            users = newUsers;
            resolve()
        })
    });
    return promise;
}

module.exports = {
    getUsers,
    updateUsers
}