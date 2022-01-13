const Discord = require('discord.js');

module.exports.config = {
    name: "bancount",
    aliases: ["ban-count"],
    usage: "Ban count.",
    owneronly: false
}

exports.run = (client, config, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`:warning: You don't have enough permission to use this command!`)
    if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send(":warning: I can't see banned members. :cry:")
    message.guild.fetchBans().then(bans => {
        if (bans.size > 1) {
            var memberormembers = "members"
        } else {
            var memberormembers = "member"
        }
        message.channel.send(`**${bans.size}** ${memberormembers} banned from this server.`)
    })
}