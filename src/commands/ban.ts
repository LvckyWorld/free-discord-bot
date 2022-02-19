import * as Discord from 'discord.js';
import * as embedHandler from '../util/embedHandler';

export async function execute(message: Discord.Message, args: string[], bot: Discord.Client) {

    if (message.member?.permissions.has("BAN_MEMBERS")) {

        var mentionedUser = message.mentions.members?.first();
        var id: Discord.UserResolvable | Discord.FetchMemberOptions | (Discord.FetchMembersOptions & { user: Discord.UserResolvable; });

        if (!(args.length >= 1)) return message.reply({
            embeds: [embedHandler.syntaxError(
                'ban <@Mention || ClientID> <reason>', message
            )]
        });

        if (args[0].match(/^[0-9]+$/)) {
            id = args[0];
        } else {
            if (mentionedUser == null || mentionedUser == undefined) {
                return message.reply({
                    embeds: [embedHandler.syntaxError(
                        'ban <@Mention || ClientID> <reason>', message
                    )]
                });
            }
            id = mentionedUser?.id;
        }

        var msg = "";
        if (args.length >= 1) {
            for (var i = 1; i < args.length; i++) {
                msg = msg + args[i] + " ";
            }
        } else if (args.length == 0) {
            msg = "No reason defined.";
        }


        // send DM to banned Player
        await message.guild?.members.fetch(id).then((member) => {
            member.send({
                embeds: [embedHandler.standardEmbed(
                    '💥 BAN-SYSTEM 💥',
                    `Your banned from the Server ${message.guild?.name}\n\n Reason: ${msg}`,
                    'RED',
                    message
                )]
            }).catch((err) => { })
        }).catch((err) => { })

        message.guild?.members.ban(id, { reason: `Ban by ${message.author.username} Reason: ${msg}` }).then((() => {
            message.reply({
                embeds: [embedHandler.standardEmbed(
                    '💥 BAN-SYSTEM 💥',
                    `A User was banned succsessfully.\n\n ClientID: ${id}\nMention: <@${id}>\nReason: \`${msg}\``,
                    'GREEN',
                    message
                )]
            })
        })).catch((err) => {
            message.reply({
                embeds: [embedHandler.error(
                    `Can't ban this User\n\n ||\`${err}\`||`,
                    message
                )]
            })
        })



    } else
        return embedHandler.noPerms('BAN_MEMBERS', message);

}