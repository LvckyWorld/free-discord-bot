import * as Discord from 'discord.js';

export function execute(message: Discord.Message, bot: Discord.Client) {
    message.channel.send('This is a test command.');
}
