const { getUsers: getUsersData, updateUsers } = require('./Users.data');
const getUsers = (req, res)=>{
    const users = getUsersData();
    let usersData = users;
    if(req.query.type == 'last') {
        usersData = users.slice(-1);
    }
    if(req.query.type == 'first') {
        usersData = users.slice(0,1);
    }
    res.send(usersData);
}

const getUsersByName = (req,res)=>{
    const users = getUsersData();
    const filteredNames = users.filter(name=>name.toLowerCase()==req.params.name.toLowerCase())
    res.send(filteredNames);
}

const getUsersAll = (req,res)=>{
    const users = getUsersData();
    const usersAll = users.filter(name=> name);
    res.send(usersAll);
}

const addUser = (req,res)=>{
    const {newUser} = req.body;
    const users = getUsersData();
    const updatedUsers = [...users, newUser];
    updateUsers(updatedUsers)
        .then(res.send( newUser + ' successfully added'))
    
}

const updateUserById = (req,res)=>{
    const {id,newName} = req.body;
    const users = [...getUsersData()];
    users[id] = newName;
    updateUsers(users).then(()=>res.send(users)).catch((err)=>res.status(500).send(err))
}

const removeUserById = (req,res)=>{
    const id = req.params.id;
    const users = [...getUsersData()];
    if(users[id]) {
        users.splice(id, 1);
        updateUsers(users).then(()=>res.send('deleted')).catch((err)=>res.status(500).send(err));
    } else {
        res.send('Error: Your ID might be invalid');
    }
}

const removeAllUsers = (req,res)=>{
    const id = req.params.id;
    const users = [];
    updateUsers(users).then(res.send('All users deleted'));
}

// setTimeout( () => {
//     const users = getUsersData();
//     updateUsers([...users, 'NewUser'])
// }, 10000)

module.exports = {
    getUsers,
    getUsersByName,
    getUsersAll,
    addUser,
    updateUserById,
    removeUserById,
    removeAllUsers
}