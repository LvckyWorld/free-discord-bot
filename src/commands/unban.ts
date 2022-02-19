import * as Discord from 'discord.js';
import * as embedHandler from '../util/embedHandler';

export async function execute(message: Discord.Message, args: string[], bot: Discord.Client) {

    if (message.member?.permissions.has("BAN_MEMBERS")) {

        var id: Discord.UserResolvable;

        if (!(args.length >= 1)) return message.reply({
            embeds: [
                embedHandler.syntaxError(
                    'unban <id>',
                    message
                )
            ]
        })

        if (args[0].match(/^[0-9]+$/)) {
            id = args[0];
        } else return message.reply({
            embeds: [
                embedHandler.syntaxError(
                    'unban <id>',
                    message
                )
            ]
        })

        var guild = message.guild;


        guild?.members.unban(id, `Unbanned by ${message.author.username}`).then((user) => {
            message.reply({
                embeds: [embedHandler.standardEmbed(
                    '💥 BAN-SYSTEM 💥',
                    `A User was unbanned succsessfully.\n\n ClientID: ${id}\nMention: <@${id}>`,
                    "GREEN", message
                )]
            });
        }).catch(err => {
            message.reply({
                embeds: [embedHandler.error(
                    `Oh no! I can't unban this User:\n${err}`, message
                )]
            })
        })

    } else
        return message.reply({
            embeds: [
                embedHandler.noPerms('BAN_MEMBERS', message)
            ]
        })

}