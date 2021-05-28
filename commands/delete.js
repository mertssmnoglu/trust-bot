const Discord = require('discord.js');

module.exports.config = {
    name: "delete",
    aliases: ["clear", "clean"],
    usage: "Deletes the specified amount of messages.",
    owneronly: false
}

exports.run = (client, config, message, args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
        return message.channel.send(":warning: You can't use this command.")
    }
    if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) {
        return message.channel.send(":warning: I can't delete messages. :cry:")
    }
    var number = args[0];
    if (!number) {
        return message.channel.send(`How many messages you want to delete ?`)
    }
    if (isNaN(number)) {
        return message.channel.send(`Only numbers please.`)
    }
    if (number <= 0 || number > 100) {
        return message.channel.send(`:person_facepalming: Use numbers between 0-100`)
    }

    message.channel.bulkDelete(number, true)
    message.channel.send(`${number} message deleted.`).then(message => {
        message.delete({
            timeout: 3500
        })
    })
}