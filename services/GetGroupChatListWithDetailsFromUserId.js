const { Users, Friends, OneToOneChats, OneToOneMessages, GroupChats, GroupMessages } = require('../models/index');

const GetGroupChatListWithDetailsFromUserId = async (userId) => {
    try {
        const groupChatList = await GroupChats.find({ members: { $in: [userId] } });

        const groupChatsListWithDetails = await Promise.all(groupChatList.map(async (groupChat) => {
            const usersPromises = groupChat.members.map(async (member) => {
                const user = await Users.findOne({ _id: member }).select('-password');
                return user;
            });

            const users = await Promise.all(usersPromises);

            const messages = await GroupMessages.find({ groupChatId: groupChat._id });

            return { ...groupChat.toObject(), users: users, messages: messages };
        }));

        groupChatsListWithDetails.sort((a, b) => {
            const dateA = new Date(a.messages[a.messages.length - 1].messageTime);
            const dateB = new Date(b.messages[b.messages.length - 1].messageTime);
            return dateB - dateA;
        });
        return groupChatsListWithDetails;
    } catch (error) {
        console.log(error)
    }
}

module.exports = GetGroupChatListWithDetailsFromUserId;