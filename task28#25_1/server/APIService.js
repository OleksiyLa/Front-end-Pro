const FileService = require('./FileService');

const CRUD_FAIL = { status: 'FAILED', statusText: '' };

const getFsErrorHandler = (req, res) => err => {
    const errorResp = CRUD_FAIL;
    errorResp.error = err;
    res.send(errorResp);
}

const addArray = (req,res) => {
    const updateData = req.body;
    const keys = Object.keys(updateData);
    let bool = true;
    if(updateData.constructor !== Object) {
        getFsErrorHandler(req, res)('Body is not an Object');
        return bool = false;
    }
    if(!keys.length){
        getFsErrorHandler(req, res)('Object shoud not be empty');
        return bool = false;
    }
    if(keys.length > 1){
        getFsErrorHandler(req, res)('You can upload only one array at a time');
        return bool = false;
    }
    keys.forEach(key => {
    if(!Array.isArray(updateData[key]) || updateData[key].length < 1){
        getFsErrorHandler(req, res)('Value shoud be a filled Array');
        return bool = false;
    }
    })

    if(bool){
        FileService.addArray(updateData)
        .then((data) => res.send(data))
        .catch(err => res.send(err))
    }
}

const getUserData = (req, res) => {
    FileService.sendData()
        .then((data)=>{res.send(data)})
}

module.exports = {
    addArray,
    getUserData
};