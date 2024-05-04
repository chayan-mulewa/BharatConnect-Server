const { Users, Friends } = require('../models/index');

const GetFriendsWithDetailsFromUserId = async (userId) => {
    try {
        const friends = await Friends.find({
            $or: [
                { user_id_1: await userId },
                { user_id_2: await userId }
            ]
        });

        const friendsWithDetails = await Promise.all(friends.map(async (friend) => {
            const { user_id_1, user_id_2 } = friend;
            const friendUserId = user_id_1 !== userId ? user_id_1 : user_id_2;
            const friendUser = await Users.findOne({ _id: friendUserId }).select('-password ');
            return { ...friend.toObject(), user: friendUser };
        }));
        return friendsWithDetails;
    } catch (error) {
        console.log(error)
    }
}

module.exports = GetFriendsWithDetailsFromUserId;