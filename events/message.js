const Discord = require("discord.js");
const config = require('../config.json');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(config.paths.sqlite);
module.exports = (client, message) => {
    // Settings
    var caseSensitiveCommands = true
    var withoutOwnerOnlyCommands = true
    var dmLogStatus = false
    if (dmLogStatus) {
        if (message.channel.type === "dm") {
            if (message.attachments.size == 0) {
                const dmEmbed = new Discord.MessageEmbed()
                    .setTitle("New DM")
                    .setColor("#32d9cb")
                    .addField(`User:`, `<@!${message.author.id}>`, true)
                    .addField(`User Id:`, `${message.author.id}`, true)
                    .addField(`Message:`, `${message.content}`, false)
                    .setThumbnail(message.author.avatarURL())
                    .setFooter(`${message.author.tag}`)
                    .setTimestamp()
                client.channels.cache.get(config.channels.dmLog).send(dmEmbed)
            } else {
                message.attachments.forEach(async (key) => {
                    var dmEmbed = new Discord.MessageEmbed()
                        .setTitle("New DM")
                        .setColor("#32d9cb")
                        .setImage(`${key.proxyURL}`)
                        .addField(`User:`, `<@!${message.author.id}>`, true)
                        .addField(`User Id:`, `${message.author.id}`, true)
                        .addField(`Message:`, `${message.content == "" ? "Null": message.content}`, false)
                        .addField("Document Link", `[Click Me](${key.proxyURL})`)
                        .setThumbnail(message.author.avatarURL())
                        .setFooter(`${message.author.tag}`)
                        .setTimestamp()
                    client.channels.cache.get(config.channels.dmLog).send(dmEmbed)
                })
            }
        }
    }
    if(config.paths.sqlite !== ""){
        if(message.author.bot) return
        db.get(`SELECT * FROM auto_responses WHERE guild_id = ${message.guild.id} AND trigger = "${message.content.toUpperCase().replace(/\'/g,"''").replace(/\"/g,"''")}"`, function (err, row) {
            if(err) return console.log(err)
            if(!row) return
            message.channel.send(row.response)
        })
    }
    if (message.author.bot || message.content.indexOf(client.config.prefix) !== 0) return;
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift();
    let cmd;
    if (caseSensitiveCommands) {
        if (client.commands.has(command)) {
            cmd = client.commands.get(command);
        } else if (client.aliases.has(command)) {
            cmd = client.commands.get(client.aliases.get(command));
        }
    } else {
        if (client.commands.has(command)) {
            cmd = client.commands.get(command);
        } else if (client.commands.has(command.toLowerCase())) {
            cmd = client.commands.get(command.toLowerCase());
        } else if (client.aliases.has(command)) {
            cmd = client.commands.get(client.aliases.get(command));
        } else if (client.aliases.has(command.toLowerCase())) {
            cmd = client.commands.get(client.aliases.get(command.toLowerCase()));
        }
    }

    if (!cmd) {
        return
    } else if (cmd.config.name == 'help') {
        var commandsUsageList = []
        client.commands.forEach(element => {
            if (!element.config.usage) return
            else if (withoutOwnerOnlyCommands && element.config.owneronly) return
            else if (!withoutOwnerOnlyCommands && element.config.owneronly) {
                var obj = {
                    name: `⭐ ${element.config.name}`,
                    usage: `${element.config.usage}`
                }
                commandsUsageList.push(obj)
            } else {
                var obj = {
                    name: `${element.config.name}`,
                    usage: `${element.config.usage}`
                }
                commandsUsageList.push(obj)
            }
        })
        return cmd.run(client, config, message, args, commandsUsageList)
    } else if (cmd.config.owneronly && !config.owners.includes(message.author.id)) {
        return message.channel.send("This command is owner only.")
    } else if (cmd) {
        cmd.run(client, config, message, args)
    }
};