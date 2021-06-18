const Discord = require('discord.js');

module.exports.config = {
    name: "avatar",
    aliases: ["show-avatar", "user-avatar", "user-photo", "profile-picture", "pp"],
    usage: "Shows mentioned user's or your avatar.",
    owneronly: false
}

exports.run = (client, config, message, args) => {
    var user = message.mentions.users.first() ? message.mentions.users.first() : message.author
    var avatarEmbed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`[**Download**](${user.avatarURL({dynamic: true , size: 2048})})`)
        .setTimestamp()
        .setTitle("Avatar")
        .setFooter(user.username, user.avatarURL())
        .setImage(user.avatarURL({ size:2048, dynamic: true}))
    message.channel.send(avatarEmbed)
}