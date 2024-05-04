const mongoose = require('mongoose');

const groupeMessages = mongoose.Schema({
    message: {
        type: String
    },
    messageType: {
        type: String
    },
    messageTime: {
        type: String
    },
    groupChatId: {
        type: String
    },
    userId:{
        type: String
    },
    sender: {
        type: String
    },
    createdBy: {
        type: String
    },
}, { versionKey: false });

const GroupeMessages = mongoose.model('GroupeMessages', groupeMessages)

module.exports = GroupeMessages;