module.exports = (client) => {
    var randomUserActivity = false
    var onlineMessage = `${client.user.username} is online!`
    console.log(onlineMessage);
    if (randomUserActivity) {

        var randomTexts = [
            "first text",
            "second text",
            "third text"
        ]

        const random = Math.floor(Math.random() * randomTextes.length);
        client.user.setActivity(randomTexts[random])
        setInterval(function () {
            client.user.setActivity(randomTexts[random])
        }, 20000);
    } else {
        client.user.setActivity(onlineMessage)
        setInterval(function () {
            client.user.setActivity(onlineMessage)
        }, 7200000);
    }
}