import * as Discord from 'discord.js';
export const bot = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_BANS,
    Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    Discord.Intents.FLAGS.GUILD_WEBHOOKS,
    Discord.Intents.FLAGS.GUILD_INVITES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
});
import * as botconfig from './configs/botconfig.json';
import * as fs from 'fs';
                        // CMD,  FILE
let commandMap = new Map<string, any>();

// Reading Files in commands folder
fs.readdir('./src/commands/', (err, files) => {
    if (err) console.error(err);
    files.forEach(file => {
        if (!file.endsWith('.ts')) return;
        const commandName = file.split('.')[0];
        // importing file
        const command = require(`./commands/${file}`);
        console.log(`Loading Command: ${commandName}`);

        commandMap.set(commandName, command);
    });
});

bot.on('messageCreate', (message) => {
    commandMap.forEach((commandFile, commandName) => {
        if (message.content.startsWith(`${botconfig.prefix + commandName}`)) {
            commandFile.execute(message, bot);
        }
    });
});

bot.on('ready', () => {
    console.log('Bot logged in.');
})

bot.login(botconfig.token);