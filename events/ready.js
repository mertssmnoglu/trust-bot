module.exports = (client) => {
    var onlineMessage = `${client.user.username} is online!`
    console.log(onlineMessage);
    client.user.setActivity(onlineMessage)
}