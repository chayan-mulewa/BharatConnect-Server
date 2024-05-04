const { Users, Friends, OneToOneChats, OneToOneMessages } = require('../models/index');

const GetOneToOneChatListWithDetailsFromUserId = async (userId) => {
    try {
        const oneToOneChatList = await OneToOneChats.find({ createdBy: await userId });

        const oneToOneChatsListWithDetails = await Promise.all(oneToOneChatList.map(async (oneToOneChat) => {
            const { user_id_1, user_id_2 } = oneToOneChat;
            const friendUserId = user_id_1 !== userId ? user_id_1 : user_id_2;
            const friendUser = await Users.findOne({ _id: friendUserId }).select('-password ');
            const messages = await OneToOneMessages.find({ chatId: oneToOneChat._id });

            return { ...oneToOneChat.toObject(), user: friendUser, messages: messages };
        }));
        oneToOneChatsListWithDetails.sort((a, b) => {
            const dateA = new Date(a.messages[a.messages.length - 1].messageTime);
            const dateB = new Date(b.messages[b.messages.length - 1].messageTime);
            return dateB - dateA;
        });
        return oneToOneChatsListWithDetails;
    } catch (error) {
        console.log(error)
    }
}

module.exports = GetOneToOneChatListWithDetailsFromUserId;