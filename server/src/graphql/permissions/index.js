const { shield, and, or } = require('graphql-shield')
const {isAdmin, isAuthenticated, isModerator} = require ('./rules')


const permissions = shield({
  Query: {
    //user
    getUsers:and(isAuthenticated, ),
    getUserById:and(isAuthenticated, or(isAdmin, isModerator)),
    getUserByUsername:isAuthenticated,
    //chat
    fetchChatrooms:isAuthenticated,
    fetchChatroomMessages:isAuthenticated,
    fetchChatRoomUsers:isAuthenticated
  },
  Mutation: {
    //user
    updateUser:and(isAuthenticated,isAdmin),
    deleteUser:and(isAuthenticated,isAdmin),
    deactivateUser:and(isAuthenticated, or(isAdmin, isModerator)),
    activateUser:and(isAuthenticated, or(isAdmin, isModerator)),
    //chat
    sendNewMessage:isAuthenticated,
    deleteMessage:isAuthenticated,
    createChatroomGroup:isAuthenticated,
    addChatRoomGroupMembers:isAuthenticated,
    removeChatRoomGroupMembers:isAuthenticated,
    deleteChatroomGroup:isAuthenticated,
  },
//   UserDto:{
//     id:isAdmin
//   }
})

module.exports = {
    permissions
}