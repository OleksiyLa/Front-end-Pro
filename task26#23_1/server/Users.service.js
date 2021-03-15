const { person } = require('./Users.data');

const getPersonData = (req,res)=>{
    let keys = Object.keys(req.query);
    if(keys.length) {
        let requested = {}
        keys.forEach(function(item){
            if(person[item] === undefined && person.address[item] !== undefined) {
                requested[item] = person.address[item];
            } else if(person[item] && person[item] !== person.address){
                requested[item] = person[item];
            } else {
                console.log(`${item} is not valid ID`)
            }
        })
        console.log(requested)
        res.send(requested);
    } else {
        res.send(person);
    }
}
const getPersonName = (req, res)=>{
    res.send(person.name);
}
const getPersonAddress = (req, res)=>{
    res.send(person.address);
}

const getPersonRecipient = (req,res)=>{
    const {name, surname, address} = person;
    const {city, street, postcode} = address
    
    const recipient = {
        name,
        surname,
        city, 
        street, 
        postcode
    }
    res.send(recipient);
}

module.exports = {
    getPersonData,
    getPersonName,
    getPersonAddress,
    getPersonRecipient
}