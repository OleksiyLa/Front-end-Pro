const userDataPath = __dirname + '/data/Users.json';
let fileNum = 1;
const password = 'my-password';
const { constants } = require('buffer');
const directory = __dirname + './../logs/';
const path = require('path');
const fs = require('fs');
const CryptoJS = require('crypto-js');

const fileCreation = (dataJson, userDataPath) => {
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
                fileCreation(JSON.stringify(data, null, '\t'), userDataPath )
                resolve("File created");
            } else {
                getUserFile()
                .then(userData =>{
                    return {...JSON.parse(userData), ...data}
                })
                .then(newUsersData =>{
                    fileCreation(JSON.stringify(newUsersData, null, '\t'), userDataPath)
                    resolve("File updated")
                })
            }
        })
    })
}

const getStatData = () => {
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

function createFiles(bodyPost){
    const StringifiedBodyPost = JSON.stringify(bodyPost);
    if (fs.existsSync(__dirname + `./../logs/log${fileNum}.txt`)) {
        fileNum++;
        createFiles(bodyPost)
    } else {
        fileCreation(encrypt(StringifiedBodyPost,password), __dirname + `./../logs/log${fileNum}.txt`)
        fileNum++;
    }
}

function getData(){
    return new Promise((resolve,reject)=>{
        const dataObj = {};
        let i = 0;
        let filenames = fs.readdirSync(directory);
        filenames.forEach((file) => {
            fs.readFile(__dirname + "./../logs/" + file, "utf8", (err, data) => {
            const { birthtime } = fs.statSync(__dirname + "./../logs/" + file)
            dataObj[birthtime] = JSON.parse(decrypt(data,password));
            i++;
            if(i === filenames.length) {
                resolve(dataObj);
            }
        }
        )});
    })
}

function encrypt (text, secret) {
    let salt = CryptoJS.lib.WordArray.random(128 / 8)
    let iv = CryptoJS.lib.WordArray.random(128 / 8)
    let encrypted = CryptoJS.AES.encrypt(text, CryptoJS.PBKDF2(secret, salt, { keySize: 256 / 32, iterations: 100 }) /* key */, { iv: iv, padding: CryptoJS.pad.Pkcs7, mode: CryptoJS.mode.CBC })
    let transitmessage = salt.toString() + iv.toString() + encrypted.toString()
    return transitmessage
    }

function decrypt (text, secret) {
    let key = CryptoJS.PBKDF2(secret, CryptoJS.enc.Hex.parse(text.substr(0, 32)) /* Salt */, { keySize: 256 / 32, iterations: 100 })
    let decrypted = CryptoJS.AES.decrypt(text.substring(64) /* encrypted */, key, { iv: CryptoJS.enc.Hex.parse(text.substr(32, 32)) /* iv */, padding: CryptoJS.pad.Pkcs7, mode: CryptoJS.mode.CBC })
    return decrypted.toString(CryptoJS.enc.Utf8)
    }

module.exports = {
    addArray,
    getStatData,
    createFiles,
    getData
};