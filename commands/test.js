const Discord = require('discord.js');

module.exports.config = {
    name: "test",
    aliases: ["test-command"]
}

exports.run = (client, message, args) => {
    var testMessage = "This is a test message. Everything is ok."
    message.channel.send(testMessage)
}