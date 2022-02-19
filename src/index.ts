import * as Discord from 'discord.js';
import 'dotenv/config';
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
import * as moment from 'moment';
export const processStartTime = moment(new Date().getTime());
import * as autoEmbedHandler from './autoembed/autoEmbed';
import * as welcomeLeaveManager from './welcomeLeaveMessage/welcomeLeaveMessage';
import * as webPanel from './webPanel/webPanel';
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
    autoEmbedHandler.autoEmbed(message);
    commandMap.forEach((commandFile, commandName) => {
        if (message.content.startsWith(`${botconfig.prefix + commandName}`)) {
            let messageArray = message.content.split(" ");
            let cmd = messageArray[0].toLowerCase();
            let args = messageArray.slice(1);
            
            commandFile.execute(message, args, bot);
        }
    });

});
bot.on('guildMemberAdd', (member) => {
    welcomeLeaveManager.welcomeMessage(member);
})
bot.on('guildMemberRemove', (member) => {
    welcomeLeaveManager.leaveMessage(member);
});

bot.on('ready', () => {
    console.log('Bot logged in sucsessfully as ' + bot.user?.username + bot.user?.discriminator);
    webPanel.startWebPanel();
})

bot.login(process.env.BOT_TOKEN);