import * as Discord from 'discord.js';
import * as fs from 'fs';
import * as accounts from './../webPanel/admins.json';
import * as embedHandler from './../util/embedHandler';

export function execute(message: Discord.Message, bot: Discord.Client) {
    if (message.member?.permissions.has("ADMINISTRATOR")) {
        let newMember = message.mentions.members?.first();
        let args = message.content.split(" ");
        // .adduser @MENTION name
        if (args.length == 3) {
            let name = String(args[2]);
            let id = String(newMember?.id);
            console.log(id, name);
            if (id == undefined) return;
            if (name == undefined) return;

            if (JSON.stringify(accounts).includes(id) || JSON.stringify(accounts).includes(name)) {
                message.channel.send({ embeds: [embedHandler.error("User already exists!", message)] });
                return;
            }


            accounts.push({ discordID: id, permissionsLevel: "ALL", name: name, "password": "2779a3aa8bf314bcdc426d29680e4a9499f5b6d9b285895bf0afc29c5969d5ba" });
            fs.writeFile("./src/webPanel/admins.json", JSON.stringify(accounts), (err) => {
                if (err) {
                    message.channel.send({ embeds: [embedHandler.error("Something went wrong!", message)] });
                } else {
                    message.channel.send({
                        embeds: [embedHandler.standardEmbed(
                            "User Management",
                            "User added successfully!\nAccount Informations are send to the User.",
                            'RANDOM', message)]
                    });
                    newMember?.send({
                        embeds: [embedHandler.standardEmbed(
                            "User Management",
                            "You have been added to the Web Panel!\nName: " + name + "\nPassword: lwnewuser",
                            'RANDOM', message)]
                    });
                }
            });
        }
    }
}
