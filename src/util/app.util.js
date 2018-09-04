
function findUser(userList, userId){
    const user = userList.find((user) => user.id === parseInt(userId));
    return user;
}

function findChat(chatList, chatId){
    const chat = chatList.find((chat) => chat.id === parseInt(chatId));
    return chat;
}

module.exports = {
    findUser,
    findChat
};