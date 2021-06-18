const Discord = require('discord.js');

module.exports.config = {
    name: "slowmode",
    aliases: ["slow-mode", "timeout"],
    usage: "Set slowmode to channels.",
    owneronly: false
}

exports.run = (client, config, message, args) => {
    var messageLimit = args[0];
    if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply(":warning: You can't use this command.")
    else if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(":warning: I can't set slowmode to this channel.")
    else if (!messageLimit) return message.channel.send(`Please enter a slowmode count.`)
    else if (isNaN(messageLimit) && messageLimit.toLowerCase() == "off") {
        return message.channel.setRateLimitPerUser(0).then(() => {
            message.react('✅');
            message.delete({
                timeout: 5000
            })
        })
    } else if (isNaN(messageLimit) && messageLimit.toLowerCase() !== "off") return message.channel.send(`Please use numbers.`)
    else if (messageLimit < 0 || messageLimit > 21600) return message.channel.send(`Message limit must be between 0-21600`)
    message.channel.setRateLimitPerUser(messageLimit).then(() => {
        message.react('✅');
        message.delete({
            timeout: 5000
        })
    })
}