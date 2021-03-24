const userDataPath = __dirname + '/data/Users.json';
const { constants } = require('buffer');
const fs = require('fs');

const fileCreation = (dataJson) => {
    return new Promise((resolve,reject)=>{
        fs.writeFile(userDataPath, dataJson, (err)=>{
            if(err) {
                reject(err)
            }
            resolve()
        })
    })
}

const getUserFile = () => {
    return new Promise((resolve,reject)=>{
        fs.readFile(userDataPath, (err, data) => {
            if (err) {
                reject(err);
            } 
            resolve(data);
        });
    })
}

const addArray = (data) => {
    return new Promise((resolve,reject)=>{
        fs.access( userDataPath, fs.constants.F_OK, err =>{
            if(err){
                fileCreation(JSON.stringify(data, null, '\t') )
                resolve("File created");
            } else {
                getUserFile()
                .then(userData =>{
                    return {...JSON.parse(userData), ...data}
                })
                .then(newUsersData =>{
                    fileCreation(JSON.stringify(newUsersData, null, '\t'))
                    resolve("File updated")
                })
            }
        })
    })
}

const sendData = () => {
    return new Promise((resolve,reject)=>{
        let count
        let valuesTotalLength = 0;
        let uniqueValues = [];
        let arithmeticMean;
        let keys;
        getUserFile()
            .then(userData => {
                return JSON.parse(userData)
            })
            .then(data => {
                keys = Object.keys(data);
                count = keys.length;
                keys.forEach(key => {
                    valuesTotalLength += data[key].length;
                    data[key].forEach(value=>{
                        if(!uniqueValues.includes(value)) {
                            uniqueValues.push(value)
                        }
                    })
                })
                arithmeticMean = valuesTotalLength / count;
                return {"count": count, "valuesTotalLength": valuesTotalLength, "uniqueValues": uniqueValues, "arithmeticMean": Math.round(arithmeticMean)}
            })
            .then((data)=> resolve(data))
        })
    
}

module.exports = {
    addArray,
    sendData
};