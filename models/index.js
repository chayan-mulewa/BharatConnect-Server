const Users = require('./usersModel');
const Friends = require('./friendsModel');
const OneToOneChats = require('./oneToOneChats');
const OneToOneMessages = require('./oneToOneMessages');
const GroupChats = require('./groupChats');
const GroupMessages = require('./groupMessages');

module.exports = { Users, Friends, OneToOneChats, OneToOneMessages, GroupChats, GroupMessages };