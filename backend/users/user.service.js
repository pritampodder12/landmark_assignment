// const config = require('config.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;

module.exports = {
    // authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    logout,
    getRecords
};

// async function authenticate({ username, password }, ip) {
//     const user = await User.findOne({ username });
//     if (user && bcrypt.compareSync(password, user.hash)) {
//         const { hash, ...userWithoutHash } = user.toObject();
//         const token = jwt.sign({ sub: user.id }, config.secret);
//         user.lastLoginDate = new Date().toISOString();
//         user.clientIp = ip;
//         await user.save();
//         return {
//             ...userWithoutHash,
//             token
//         };
//     }
// }

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }
    if (userParam.role) {
        user.role = userParam.role;
    }

    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}

async function logout(id) {
    const user = await User.findById(id);
    if (!user) throw 'User not found';

    let userParam = {
        lastLogoutDate: new Date().toISOString()
    }

    Object.assign(user, userParam);

    await user.save();
}

async function getRecords(id) {
    const user = await User.findById(id);
    if (user?.role?.toLowerCase() !== 'auditor') {
        throw {
            name: 'PermissionError'
        }
    }
    return await User.find().select();
}