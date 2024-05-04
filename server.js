const app = require('./app');
const socketio = require('socket.io');
const { Users, Friends, OneToOneChats, OneToOneMessages, GroupChats, GroupMessages } = require('./models/index');
const { GetUserIdFromSocket, GetUserDetailsFromUserId, GetFriendsWithDetailsFromUserId, GetUsersFromUsername, GetOneToOneChatListWithDetailsFromUserId, GetGroupChatListWithDetailsFromUserId } = require('./services/index');
const PORT_NUMBER = 5000;

const server = app.listen(PORT_NUMBER, () => {
  console.log("Server Is Started At Port Number : " + PORT_NUMBER);
});

const io = socketio(server, {
  cors: {
    origin: true,
    credentials: true
  }
});

io.on('connect', async (socket) => {

  console.log(socket.handshake.headers.cookie);

  // const userId = await GetUserIdFromSocket(socket);
  // const user = await GetUserDetailsFromUserId(userId);
  // const friendsWithDetails = await GetFriendsWithDetailsFromUserId(userId);
  // const oneToOneChatListWithDetails = await GetOneToOneChatListWithDetailsFromUserId(userId);
  // const groupChatListWithDetails = await GetGroupChatListWithDetailsFromUserId(userId);
  // await socket.emit('myDetails', user);
  // await socket.emit('friendList', friendsWithDetails);
  // await socket.emit('oneToOneChatList', oneToOneChatListWithDetails);
  // await socket.emit('groupChatList', groupChatListWithDetails);


  // friendsWithDetails.map(async (data, index) => {
  //   const sockets = await io.fetchSockets();
  //   sockets.map(async (s, index) => {
  //     const socket_id = await GetUserIdFromSocket(s);
  //     if (socket_id == data.user._id && data.status == 'accepted') {
  //       await s.emit('onlineUser', userId);
  //       await socket.emit('onlineUser', data.user._id);
  //     }
  //   });
  // });

  // // -----------------------------------------------------------------------//

  // socket.on('getMyDetails', async (userId) => {
  //   const user = await GetUserDetailsFromUserId(userId);
  //   await socket.emit('myDetails', user);
  // })

  // socket.on('getUserDetails', async (userId) => {
  //   const user = await GetUserDetailsFromUserId(userId);
  //   await socket.emit('userDetails', user);
  // })

  // socket.on('createOneToOneChat', async (data) => {
  //   const oneToOneChat_1 = new OneToOneChats({ user_id_1: data.user_id_1, user_id_2: data.user_id_2, createdBy: data.user_id_1, lastMessage: '' });
  //   await oneToOneChat_1.save();

  //   const user_1 = new OneToOneMessages({ message: '', messageType: '', messageTime: data.date, chatId: oneToOneChat_1._id, sender: data.user_id_1, receiver: data.user_id_2 });
  //   await user_1.save();

  //   const oneToOneChat = await OneToOneChats.findById(oneToOneChat_1._id);
  //   oneToOneChat.messageCount = 0;
  //   oneToOneChat.lastMessage = oneToOneChat_1._id.toString();
  //   await oneToOneChat.save();

  //   const oneToOneChatListWithDetails = await GetOneToOneChatListWithDetailsFromUserId(userId);
  //   await socket.emit('oneToOneChatList', oneToOneChatListWithDetails);

  //   const existingChat = await OneToOneChats.findOne({ user_id_1: data.user_id_2, user_id_2: data.user_id_1, createdBy: data.user_id_2 });

  //   if (!existingChat) {
  //     const oneToOneChat_2 = new OneToOneChats({ user_id_1: data.user_id_2, user_id_2: data.user_id_1, createdBy: data.user_id_2, lastMessage: '' });
  //     await oneToOneChat_2.save();

  //     const user_2 = new OneToOneMessages({ message: '', messageType: '', messageTime: data.date, chatId: oneToOneChat_2._id, sender: data.user_id_1, receiver: data.user_id_2 });
  //     await user_2.save();

  //     const oneToOneChat = await OneToOneChats.findById(oneToOneChat_2._id);
  //     oneToOneChat.messageCount = 0;
  //     oneToOneChat.lastMessage = user_2._id.toString();
  //     await oneToOneChat.save();

  //     const sockets = await io.fetchSockets();
  //     sockets.map(async (s, index) => {
  //       const socket_id = await GetUserIdFromSocket(s);
  //       if (socket_id == data.user_id_2) {
  //         const socket_id = await GetUserIdFromSocket(s);
  //         const socket_id_oneToOneChatListWithDetails = await GetOneToOneChatListWithDetailsFromUserId(socket_id);
  //         await s.emit('oneToOneChatList', socket_id_oneToOneChatListWithDetails);
  //       }
  //     });
  //     return;
  //   }

  //   const user_2 = new OneToOneMessages({ message: '', messageType: '', messageTime: data.date, chatId: existingChat._id, sender: data.user_id_1, receiver: data.user_id_2 });
  //   await user_2.save();

  //   const oneToOneChat_2 = await OneToOneChats.findById(existingChat._id);
  //   oneToOneChat_2.messageCount = ++oneToOneChat_2.messageCount;
  //   oneToOneChat_2.lastMessage = user_2._id.toString();
  //   await oneToOneChat_2.save();
  //   const sockets = await io.fetchSockets();
  //   sockets.map(async (s, index) => {
  //     const socket_id = await GetUserIdFromSocket(s);
  //     if (socket_id == data.user_id_2) {
  //       const socket_id = await GetUserIdFromSocket(s);
  //       const socket_id_oneToOneChatListWithDetails = await GetOneToOneChatListWithDetailsFromUserId(socket_id);
  //       await s.emit('oneToOneChatList', socket_id_oneToOneChatListWithDetails);
  //     }
  //   });

  // })
  // socket.on('deleteOneToOneChat', async (data) => {
  //   await OneToOneChats.findByIdAndDelete(data);
  //   await OneToOneMessages.deleteMany({ chatId: data });
  //   const oneToOneChatListWithDetails = await GetOneToOneChatListWithDetailsFromUserId(userId);
  //   await socket.emit('oneToOneChatList', oneToOneChatListWithDetails);
  // })

  // socket.on('sendMessage', async (data) => {
  //   const user_1 = new OneToOneMessages({ message: data.message, messageType: data.messageType, messageTime: data.messageTime, chatId: data.chatId, sender: data.user_id_1, receiver: data.user_id_2 });
  //   await user_1.save();

  //   const oneToOneChat_1 = await OneToOneChats.findById(data.chatId);
  //   oneToOneChat_1.messageCount = 0;
  //   oneToOneChat_1.lastMessage = user_1._id.toString();
  //   await oneToOneChat_1.save();

  //   const oneToOneChatListWithDetails = await GetOneToOneChatListWithDetailsFromUserId(data.user_id_1);
  //   await socket.emit('oneToOneChatList', oneToOneChatListWithDetails);

  //   const existingChat = await OneToOneChats.findOne({ user_id_1: data.user_id_2, user_id_2: data.user_id_1, createdBy: data.user_id_2 });

  //   if (!existingChat) {
  //     const oneToOneChat_2 = new OneToOneChats({ user_id_1: data.user_id_2, user_id_2: data.user_id_1, createdBy: data.user_id_2, lastMessage: '' });
  //     await oneToOneChat_2.save();

  //     const user_2 = new OneToOneMessages({ message: data.message, messageType: data.messageType, messageTime: data.messageTime, chatId: oneToOneChat_2._id, sender: data.user_id_1, receiver: data.user_id_2 });
  //     await user_2.save();

  //     const oneToOneChat = await OneToOneChats.findById(oneToOneChat_2._id);
  //     oneToOneChat.messageCount = 1;
  //     oneToOneChat.lastMessage = user_2._id.toString();
  //     await oneToOneChat.save();
  //     const sockets = await io.fetchSockets();
  //     sockets.map(async (s, index) => {
  //       const socket_id = await GetUserIdFromSocket(s);
  //       if (socket_id == data.user_id_2) {
  //         const socket_id = await GetUserIdFromSocket(s);
  //         const socket_id_oneToOneChatListWithDetails = await GetOneToOneChatListWithDetailsFromUserId(socket_id);
  //         await s.emit('oneToOneChatList', socket_id_oneToOneChatListWithDetails);
  //       }
  //     });
  //     return;
  //   }

  //   const user_2 = new OneToOneMessages({ message: data.message, messageType: data.messageType, messageTime: data.messageTime, chatId: existingChat._id, sender: data.user_id_1, receiver: data.user_id_2 });
  //   await user_2.save();
  //   const oneToOneChat_2 = await OneToOneChats.findById(existingChat._id);
  //   oneToOneChat_2.messageCount = ++oneToOneChat_2.messageCount;
  //   oneToOneChat_2.lastMessage = user_2._id.toString();
  //   await oneToOneChat_2.save();
  //   const sockets = await io.fetchSockets();
  //   sockets.map(async (s, index) => {
  //     const socket_id = await GetUserIdFromSocket(s);
  //     if (socket_id == data.user_id_2) {
  //       const socket_id = await GetUserIdFromSocket(s);
  //       const socket_id_oneToOneChatListWithDetails = await GetOneToOneChatListWithDetailsFromUserId(socket_id);
  //       await s.emit('oneToOneChatList', socket_id_oneToOneChatListWithDetails);
  //     }
  //   });
  // })

  // socket.on('setMessgeCountZero', async (chatId) => {
  //   const oneToOneChat_1 = await OneToOneChats.findById(chatId);
  //   oneToOneChat_1.messageCount = 0;
  //   await oneToOneChat_1.save();

  //   const oneToOneChatListWithDetails = await GetOneToOneChatListWithDetailsFromUserId(userId);
  //   await socket.emit('oneToOneChatList', oneToOneChatListWithDetails);
  // })

  // socket.on('createGroupChat', async (data) => {

  //   const groupChat_1 = new GroupChats({ groupName: data.groupName, profile_photo: data.profilePhoto, createdBy: data.createdBy, members: data.members, lastMessage: '' });
  //   await groupChat_1.save();

  //   const user_1 = new GroupMessages({ message: '', messageType: '', messageTime: data.date, groupChatId: groupChat_1._id, sender: data.createdBy });
  //   await user_1.save();

  //   const groupChat = await GroupChats.findById(groupChat_1._id);
  //   groupChat.messageCount = 0;
  //   groupChat.lastMessage = groupChat_1._id.toString();
  //   await groupChat.save();

  //   const members = groupChat.members;

  //   members.map(async (id, index) => {
  //     const sockets = await io.fetchSockets();
  //     sockets.map(async (s, index) => {
  //       const socket_id = await GetUserIdFromSocket(s);
  //       if (id != socket_id) {
  //         return
  //       }
  //       const u = await GetGroupChatListWithDetailsFromUserId(socket_id);
  //       await s.emit('groupChatList', u);
  //     });
  //   })
  // })

  // socket.on('sendGroupMessage', async (data) => {
  //   const user_1 = new GroupMessages({ message: data.message, messageType: data.messageType, messageTime: data.messageTime, groupChatId: data.groupChatId, sender: data.sender, userId: data.userId });
  //   await user_1.save();

  //   const groupChat = await GroupChats.findById(data.groupChatId);
  //   // groupChat.messageCount = ++groupChat.messageCount;
  //   groupChat.lastMessage = user_1._id.toString();
  //   await groupChat.save();

  //   const u1 = await GetGroupChatListWithDetailsFromUserId(userId);
  //   await socket.emit('groupChatList', u1);

  //   groupChat.members.map(async (member, index) => {
  //     const memberId = member;
  //     if (memberId != userId) {
  //       const user_1 = new GroupMessages({ message: data.message, messageType: data.messageType, messageTime: data.messageTime, groupChatId: data.groupChatId, sender: data.sender, userId: memberId });
  //       await user_1.save();
  //     }
  //     const sockets = await io.fetchSockets();
  //     sockets.map(async (s, index) => {
  //       const socket_id = await GetUserIdFromSocket(s);
  //       if (memberId == userId) {
  //         return;
  //       }
  //       const u = await GetGroupChatListWithDetailsFromUserId(memberId);
  //       await s.emit('groupChatList', u);
  //     });

  //   })

  // })

  // socket.on('deleteGroupChat', async (data) => {

  //   const groupChat = await GroupChats.findById(data.groupChatId);
  //   const members = groupChat.members;

  //   if (data.createdBy == userId) {
  //     await GroupMessages.deleteMany({ groupChatId: data.groupChatId });
  //     await GroupChats.findByIdAndDelete(data.groupChatId);
  //   } else {
  //     await GroupMessages.deleteMany({ userId: data.groupChatId });
  //     await GroupChats.findByIdAndUpdate(data.groupChatId, { $pull: { members: { $in: data.userId } } });
  //   }

  //   members.map(async (id, index) => {
  //     const sockets = await io.fetchSockets();
  //     sockets.map(async (s, index) => {
  //       const socket_id = await GetUserIdFromSocket(s);
  //       if (id != socket_id) {
  //         return
  //       }
  //       const u = await GetGroupChatListWithDetailsFromUserId(socket_id);
  //       await s.emit('groupChatList', u);
  //     });
  //   })
  // })

  // socket.on('createFriend', async (data) => {
  //   const friend = new Friends({ user_id_1: data.user_id_1, user_id_2: data.user_id_2, sender: data.sender, status: data.status });
  //   await friend.save();

  //   const updatedFirendList = await GetFriendsWithDetailsFromUserId(data.user_id_1);
  //   await socket.emit('friendList', updatedFirendList);

  //   const sockets = await io.fetchSockets();
  //   sockets.map(async (s, index) => {
  //     const socket_id = await GetUserIdFromSocket(s);
  //     if (socket_id == data.user_id_2) {
  //       const socket_id = await GetUserIdFromSocket(s);
  //       const socket_id_FirendList = await GetFriendsWithDetailsFromUserId(socket_id);
  //       await s.emit('friendList', socket_id_FirendList);
  //     }
  //   });
  // });

  // socket.on('accpetFriend', async (data) => {
  //   await Friends.findByIdAndUpdate(data.friendId, { status: 'accepted' });

  //   const updatedFirendList = await GetFriendsWithDetailsFromUserId(data.user_id_1);
  //   await socket.emit('friendList', updatedFirendList);

  //   const sockets = await io.fetchSockets();
  //   sockets.map(async (s, index) => {
  //     const socket_id = await GetUserIdFromSocket(s);
  //     if (socket_id == data.user_id_2) {
  //       const socket_id = await GetUserIdFromSocket(s);
  //       const socket_id_FirendList = await GetFriendsWithDetailsFromUserId(socket_id);
  //       await s.emit('friendList', socket_id_FirendList);
  //     }
  //   });

  //   // const sockets = await io.fetchSockets();
  //   // const socket_1 = await sockets.find(async (s) => {
  //   //   const socket_id = await GetUserIdFromSocket(s);
  //   //   return (socket_id == data.user_id_2);
  //   // });
  //   // if (socket_1) {
  //   //   console.log('createFriend')
  //   //   const socket_id = await GetUserIdFromSocket(socket_1);
  //   //   const socket_id_FirendList = await GetFriendsWithDetailsFromUserId(socket_id);
  //   //   await socket_1.emit('friendList', socket_id_FirendList);
  //   // }
  // });

  // socket.on('deleteFriend', async (data) => {
  //   await Friends.findByIdAndDelete(data.friendId);

  //   const updatedFriendsWithDetails = await GetFriendsWithDetailsFromUserId(data.user_id_1);
  //   await socket.emit('friendList', updatedFriendsWithDetails);

  //   const sockets = await io.fetchSockets();
  //   sockets.map(async (s, index) => {
  //     const socket_id = await GetUserIdFromSocket(s);
  //     if (socket_id == data.user_id_2) {
  //       const socket_id = await GetUserIdFromSocket(s);
  //       const socket_id_FirendList = await GetFriendsWithDetailsFromUserId(socket_id);
  //       await s.emit('friendList', socket_id_FirendList);
  //     }
  //   });

  //   // const sockets = await io.fetchSockets();
  //   // const socket_1 = await sockets.find(async (s) => {
  //   //   const socket_id = await GetUserIdFromSocket(s);
  //   //   return (socket_id == data.user_id_2);
  //   // });
  //   // if (socket_1) {
  //   //   console.log('createFriend')
  //   //   const socket_id = await GetUserIdFromSocket(socket_1);
  //   //   const socket_id_FirendList = await GetFriendsWithDetailsFromUserId(socket_id);
  //   //   await socket_1.emit('friendList', socket_id_FirendList);
  //   // }
  // });

  // socket.on('searchUsers', async (searchUsers) => {
  //   const users = await GetUsersFromUsername(searchUsers);
  //   socket.emit('getSearchedUsers', users);
  // })

  // socket.on('disconnect', async () => {
  //   friendsWithDetails.map(async (data, index) => {
  //     const sockets = await io.fetchSockets();
  //     sockets.map(async (s, index) => {
  //       const socket_id = await GetUserIdFromSocket(s);
  //       if (socket_id == data.user._id && data.status == 'accepted') {
  //         await s.emit('offlineUser', userId);
  //       }
  //     });
  //   });
  // })

});
