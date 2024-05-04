const { Users } = require('../models/index');

const GetUsersFromUsername = async (username) => {
    const regex = new RegExp(`^${username}`, 'i');
    const users = await Users.find({ username: { $regex: regex } }).select('-password');
    return users;
}

module.exports = GetUsersFromUsername;
