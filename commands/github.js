const Discord = require('discord.js');
const fetch = require('node-fetch')
module.exports.config = {
    name: "github",
    aliases: ["github.com"],
    usage: "Shows github profile or repositories.",
    owneronly: false
}

exports.run = (client, config, message, args) => {
    if (args.length) {
        if (!args[0].includes("/")) {
            var processType = "profile"
        } else if (!args[0].includes("/") || args[0].split("/")[0] == '' || args[0].split("/")[1] == '') {
            return message.channel.send("Please provide a vaild user or repo name.`")
        } else {
            var processType = "repository"
        }
        switch (processType) {
            case "profile":
                var userName = args[0].split("/")[0]
                var userUri = `https://api.github.com/users/${userName}`;
                var userResult = encodeURI(userUri);
                fetch(userResult).then(userRes => userRes.json()).then(userRes => {
                    if (userRes.message == "Not Found") {
                        return message.channel.send(`\`${userName}\` is not an existing user.`)
                    } else {
                        let githubUserEmbed = new Discord.MessageEmbed()
                            .setTitle(userName)
                            .setURL(userRes.html_url)
                            .setThumbnail(userRes.avatar_url)
                            .setDescription(userRes.bio ? userRes.bio: "")
                            .addField("About",`Company: ${userRes.company ? userRes.company : "No Company"}\n${userRes.blog ? `[Web Site](${userRes.blog})` : "No Website"}\nTwitter: ${userRes.twitter_username ? `[Click Me](https://twitter.com/${userRes.twitter_username})` : "No Twitter Account"}`)
                            .setFooter("Github", "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png")
                        message.channel.send(githubUserEmbed)
                    }
                })
                break;
            case "repository":
                var userName = args[0].split("/")[0]
                var repoName = args[0].split("/")[1]
                var userUri = `https://api.github.com/users/${userName}`;
                var userResult = encodeURI(userUri);
                var userRepos = [];
                fetch(userResult).then(userRes => userRes.json()).then(userRes => {
                    if (userRes.message == "Not Found") {
                        return message.channel.send(`\`${userName}\` is not an existing user.`)
                    } else {
                        var repoUri = `https://api.github.com/users/${userName}/repos`;
                        var repoResult = encodeURI(repoUri);
                        fetch(repoResult).then(repoRes => repoRes.json()).then(repoRes => {
                            repoRes.forEach(element => {
                                userRepos.push(element.name)
                                if (element.name == repoName) {
                                    let githubRepoEmbed = new Discord.MessageEmbed()
                                        .setTitle(userName)
                                        .setURL(userRes.html_url)
                                        .setThumbnail(userRes.avatar_url)
                                        .setDescription(element.description ? element.description : "")
                                        .addField("Repository", `[${repoName}](${element.html_url})`)
                                        .addField("Language", `${element.language}`)
                                        .setFooter("Github", "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png")
                                    if (element.license) {
                                        githubRepoEmbed.addField("License", `${element.license.name}`)
                                    }
                                    message.channel.send(githubRepoEmbed)
                                }
                            });
                            if(!userRepos.includes(repoName)) return message.channel.send(`\`${userName}/${repoName}\` is not exist.`)
                        })
                    }
                })
                break;
        }
    } else {
        message.channel.send("No arguments given.")
    }
}