const mongoose = require('mongoose');

const friendsSchema = mongoose.Schema({
    user_id_1: {
        type: String
    },
    user_id_2: {
        type: String
    },
    sender: {
        type: String
    },
    status: {
        type: String,
    }
}, { versionKey: false });

const Friends = mongoose.model('friends', friendsSchema)

module.exports = Friends;
