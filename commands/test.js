const Discord = require('discord.js');

module.exports.config = {
    name: "test",
    aliases: ["test-command"],
    usage:"",
    owneronly: true
}

exports.run = (client, config, message, args) => {
    var testMessage = "This is a test message. Everything is ok."
    message.channel.send(testMessage)
}