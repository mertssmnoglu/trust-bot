const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const config = require('./config.json');

fs.readdir("./events", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.config = config;
fs.readdir("./commands", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        let commands = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Command Loaded: ${commandName}`);
        client.commands.set(commands.config.name, commands);
        commands.config.aliases.forEach(alias => client.aliases.set(alias, commandName));
    });
});

client.login(config.token);