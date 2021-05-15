const config = require('../config.json');
module.exports = (client, message) => {
    if (message.author.bot || message.content.indexOf(client.config.prefix) !== 0) return;
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift();
    var caseSensitive = true
    let cmd;
    if (caseSensitive) {
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
    }
    
    else if (cmd.config.name == 'help') {
        var commandsUsageList = []
        client.commands.forEach(element => {
            if (element.config.usage) {
                var obj = {
                    name: `${element.config.name}`,
                    usage: `${element.config.usage}`
                }
                commandsUsageList.push(obj)
            }
        })
        return cmd.run(client, message, args, commandsUsageList)
    }

    else if (cmd.config.owneronly && !config.owners.includes(message.author.id)) {
        return message.channel.send("This command is owner only.")
    }

    else if (cmd) {
        cmd.run(client, message, args)
    }
};