import * as Discord from 'discord.js';
import * as embedHandler from '../util/embedHandler';

export async function execute(message: Discord.Message, args: string[], bot: Discord.Client) {

    if (message.member?.permissions.has("MODERATE_MEMBERS")) {

        var mentionedUser = message.mentions.members?.first();
        var id: any;

        var minutes: any;

        if (!(args.length >= 2)) return message.reply({
            embeds: [embedHandler.syntaxError(
                'timeout <@Mention || ClientID> <time in minutes>', message
            )]
        });

        if (args[0].match(/^[0-9]+$/)) {
            id = args[0];
        } else {
            if (mentionedUser == null || mentionedUser == undefined) {
                return message.reply({
                    embeds: [embedHandler.syntaxError(
                        'timeout <@Mention || ClientID> <time in minutes>', message
                    )]
                });
            }
            id = mentionedUser?.id;
        }

        if (args[1].match(/^[0-9]+$/)) {
            minutes = args[1];
        } else return message.reply({
            embeds: [
                embedHandler.syntaxError(
                    'timeout <@Mention || ClientID> <time in minutes>',
                    message
                )
            ]
        })

        // send DM to kickned Player
        await message.guild?.members.fetch(id).then((member) => {
            member.timeout(1000 * 60 * minutes, `You've been timeouted by ${message.author.username}`).then(() => {
                message.reply({
                    embeds: [embedHandler.standardEmbed(
                        '💥 BAN-SYSTEM 💥',
                        `A User was timeouted succsessfully.\n\n ClientID: ${id}\nMention: <@${id}>`,
                        'GREEN',
                        message
                    )]
                }).catch((err) => {
                    message.reply({
                        embeds: [embedHandler.error(
                            `Oh damn, I can\'t timeout this User\n\n||\`${err}\`||`, message
                        )]
                    })
                })
            })
        }).catch((err) => { })


    } else
        return message.reply({
            embeds: [
                embedHandler.noPerms('MODERATE_MEMBERS', message)
            ]
        })
}