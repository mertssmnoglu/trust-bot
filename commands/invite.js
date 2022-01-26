const Discord = require('discord.js');

module.exports.config = {
    name: "invite",
    aliases: ["invite-the-bot", "invite-me", "add-me-to-your-server", "invite-bot", "invite-link"],
    usage: "Send an invite link.",
    owneronly: false
}

exports.run = (client, config, message, args) => {
    var ınviteEmbed = new Discord.MessageEmbed()
        .setTitle("Invite Link")
        .setColor("GREEN")
        .setDescription(`Invite me to your server, https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
        .setTimestamp()
        .setFooter(client.user.tag, client.user.avatarURL())
    message.channel.send(ınviteEmbed)
}