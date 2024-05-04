const { Users } = require('../models/index');

const GetUserDetailsFromUserId = async (userId) => {
    try {
        const user = await Users.findOne({ _id: userId }).select('-password');
        return user;
    } catch (error) {
        console.log(error);
    }
}

module.exports = GetUserDetailsFromUserId;