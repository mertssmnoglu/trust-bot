module.exports = (client) => {
    var randomUserActivity = false
    var onlineMessage = `${client.user.username} is online!`
    console.log(onlineMessage);
    if (randomUserActivity) {

        var randomTextes = [
            "first text",
            "second text",
            "third text"
        ]

        const random = Math.floor(Math.random() * randomTextes.length);
        client.user.setActivity(randomTextes[random])
        setInterval(function () {
            client.user.setActivity(randomTextes[random])
        }, 20000);
    } else {
        client.user.setActivity(onlineMessage)
        setInterval(function () {
            client.user.setActivity(onlineMessage)
        }, 7200000);
    }
}