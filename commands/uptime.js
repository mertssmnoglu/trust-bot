const Discord = require('discord.js');

module.exports.config = {
    name: "uptime",
    aliases: ["bot-uptime"],
    usage: "Shows uptime of the bot.",
    owneronly: false
}

exports.run = (client, config, message, args) => {
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    var uptimeEmbed = new Discord.MessageEmbed()
        .setTitle(`${client.user.username} Uptime!`)
        .setColor("GREEN")
        .addField("💻 Uptime", `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`, true)
        .setFooter(client.user.username)
    message.channel.send(uptimeEmbed)
}