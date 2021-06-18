const Discord = require('discord.js');

module.exports.config = {
    name: "ping",
    aliases: ["botping","bot-ping"],
    usage: "Shows bot's ping",
    owneronly: false
}

exports.run = (client, config, message, args) => {
    const addComaToNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (client.ws.ping.toFixed(0) >= 350) {
        var color = "RED";
    } else if (client.ws.ping.toFixed(0) >= 200) {
        var color = "ORANGE";
    } else {
        var color = "GREEN";
    }
    var pingEmbed = new Discord.MessageEmbed()
        .setTitle(`${client.user.username} Ping!`)
        .setColor(color)
        .addField("💻 Bot Ping", `${addComaToNumber(client.ws.ping.toFixed(0))} ms`, true)
        .setFooter(client.user.username)
    message.channel.send(pingEmbed)
}