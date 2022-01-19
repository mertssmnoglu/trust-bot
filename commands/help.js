const Discord = require('discord.js');

module.exports.config = {
    name: "help",
    aliases: [],
    usage: "Shows all bot commands.",
    owneronly: false
}

exports.run = (client, config, message, args, commandsUsageList) => {
    var helpmessage = []
    commandsUsageList.forEach(helping => {
        helpmessage.push(`**${helping.name}** => ${helping.usage}`)
    });
    var embed = new Discord.MessageEmbed()
        .setTitle("Help")
        .setColor("#cf733e")
        .addField("Commands", helpmessage.join("\n"))
        .setFooter(client.user.tag,client.user.avatarURL())
    message.channel.send(embed)
}