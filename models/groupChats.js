const mongoose = require('mongoose');

const groupChats = mongoose.Schema({
    groupName: {
        type: String
    },
    profile_photo: {
        type: String
    },
    createdBy: {
        type: String
    },
    members: {
        type: [String]
    },
    lastMessage: {
        type: String
    },
    messageCount: {
        type: Number
    }
}, { versionKey: false });

const GroupChats = mongoose.model('groupChats', groupChats)

module.exports = GroupChats;