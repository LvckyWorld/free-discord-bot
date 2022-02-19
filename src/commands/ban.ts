import * as Discord from 'discord.js';
import * as embedHandler from '../util/embedHandler';

export async function execute(message: Discord.Message, args: string[], bot: Discord.Client) {

    if (message.member?.permissions.has("BAN_MEMBERS")) {

        var mentionedUser = message.mentions.members?.first();

        var msg = "";
        if (args.length >= 1) {
            for (var i = 1; i < args.length; i++) {
                msg = msg + args[i] + " ";
            }
        } else if (args.length == 0) {
            msg = "kein Grund angegeben.";
        }

        if (mentionedUser?.bannable) {
            
        }

    } else
        return embedHandler.noPerms('BAN_MEMBERS', message);

}