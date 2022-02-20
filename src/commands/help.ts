
import * as Discord from 'discord.js';
import * as embedHandler from '../util/embedHandler';
import * as botconf from '../configs/botconfig.json';

let p = botconf.prefix;

export async function execute(message: Discord.Message, args: string[], bot: Discord.Client) {


    message.reply({
        embeds: [embedHandler.standardEmbed(
            '❓ Help ❓',
`
Im a full modular DiscordBOT by LvckyWorld.
Here You have an list of all possible commands:

${p}ban - Ban a User from the Server
${p}unban - Unban a User from the Server
${p}kick - Kick a User form the Serber
${p}timeout - Set a User in Timeout
${p}cc - A simple chat clear command
${p}status - Print the Status of the Bot

You need help or have any Questions?
https://lvckyworld.net
`,
            'RANDOM', message
        )]
    })


}