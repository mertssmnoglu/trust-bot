const Discord = require('discord.js');

module.exports.config = {
    name: "help",
    aliases: [],
    usage: "Shows all bot commands.",
    owneronly: false
}

exports.run = (client, message, args, commandsUsageList) => {
    var helpmessage = []
    commandsUsageList.forEach(helping => {
        helpmessage.push(`**${helping.name}** => ${helping.usage}`)
    });
    var embed = new Discord.MessageEmbed()
        .setTitle("Help")
        .setColor("#cf733e")
        .addField("Commands", helpmessage.join("\n"))
    message.channel.send(embed)
}