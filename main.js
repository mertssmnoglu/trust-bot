const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const inquirer = require("inquirer");

fs.access("conf.json", async (err) => {
    if (err) {
        console.log("File doesnt exists. Let's create one.")
        await createConfigFile()
        console.log("conf.json file successfully created. Restarting in 5 seconds...")
        setTimeout(async() => {
            await runBot('./conf.json')
        }, 5000);
    } else {
            await runBot('./conf.json')
    }
});

async function createConfigFile(params) {
    await inquirer.prompt([{
        name: "token",
        type: "input",
        message: "What is your bot token?",
    }, {
        name: "prefix",
        type: "input",
        message: "What is your bot prefix?",
        default: "!"
    }, {
        name: "owners",
        type: "input",
        message: "What are the ids of owners of the bot?(leave a one space between each)",
    }]).then((answer) => {
        answer.owners = answer.owners.split(" ")
        const fileName = "conf.json";
        var configDatas = {
            token: answer.token,
            prefix: answer.prefix,
            owners: answer.owners
        }
        const content = JSON.stringify(configDatas);
        fs.writeFileSync(fileName, content);
    });
}

async function runBot(configfile) {
    const config = require(configfile);
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
}