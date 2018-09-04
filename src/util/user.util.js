
function findUser(userList, userId){
    const user = userList.find((user) => user.id === parseInt(userId));
    return user;
}

module.exports = {
    findUser
};