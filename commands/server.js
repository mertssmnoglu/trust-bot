const Discord = require('discord.js');

module.exports.config = {
    name: "server",
    aliases: ["server-info", "serverinfo", "guild", "guild-info", "guildinfo"],
    usage: "Shows server info.",
    owneronly: false
}

exports.run = (client, config, message, args) => {
    const embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle('Server Info')
        .setThumbnail(message.guild.iconURL({
            format: "png",
            dynamic: true,
            size: 4096
        }))
        .addField("Name:", message.guild.name, true)
        .addField("Owner:", message.guild.owner, false)
        .addField("Emojis Count:", message.guild.emojis.cache.size, true)
        .addField("Roles Count:", `${message.guild.roles.cache.size}`, true)
        .addField("Boost Level:", `${message.guild.premiumTier}`, true)
        .addField("Boost Count:", `${message.guild.premiumSubscriptionCount}`, true)
        .addField("Channel Count:", `${message.guild.channels.cache.size}`, true)
        .addField("Member Count:", `${message.guild.memberCount}`, true)
        .addField("✅ Online Members:", message.guild.members.cache.filter(member => member.presence.status !== "offline").size, true)
        .addField("❌ Offline Members:", message.guild.members.cache.filter(member => member.presence.status == "offline").size, true)
        .setTimestamp()
        .setFooter(`Server ID: ${message.guild.id}`);
        message.channel.send(embed)
}