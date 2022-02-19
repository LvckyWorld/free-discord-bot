import * as Discord from 'discord.js';
import * as welcomeLeaveConfig from '../configs/welcomeLeave.json';
import * as embedHandler from '../util/embedHandler';
import * as botconfig from './../configs/botconfig.json';

// You need the SERVER MEMBERS INTENT to use this feature
export async function welcomeMessage(member: Discord.GuildMember) {
    if (welcomeLeaveConfig.welcome.enabled) {
        let channel = member.guild.channels.cache.get(welcomeLeaveConfig.welcome.channel) as Discord.TextChannel;
        if (!channel) return;
        channel.send({embeds: [{
            title: welcomeLeaveConfig.welcome.embed.title.replace('$mention', "<@" + member.id + ">").replace('$server', member.guild.name).replace("$username", member.user.username),
            description: welcomeLeaveConfig.welcome.embed.description.replace('$mention', "<@" + member.id + ">").replace('$server', member.guild.name).replace("$username", member.user.username),
            color: 'RANDOM',
            timestamp: new Date(),
            footer: {
                text: embedHandler.getFooter(),
                icon_url: member.guild.iconURL({ dynamic: true }) || botconfig.standartPicURL
            },
            thumbnail: {
                url: member.guild.iconURL({ dynamic: true }) || botconfig.standartPicURL
            }
        }]})
    }
}
export async function leaveMessage(member: Discord.GuildMember | Discord.PartialGuildMember) {
    if (welcomeLeaveConfig.leave.enabled) {
        let channel = member.guild.channels.cache.get(welcomeLeaveConfig.leave.channel) as Discord.TextChannel;
        if (!channel) return;
        channel.send({embeds: [{
            title: welcomeLeaveConfig.welcome.embed.title.replace('$mention', "<@" + member.id + ">").replace('$server', member.guild.name).replace("$username", member.user.username),
            description: welcomeLeaveConfig.welcome.embed.description.replace('$mention', "<@" + member.id + ">").replace('$server', member.guild.name).replace("$username", member.user.username),
            color: 'RANDOM',
            timestamp: new Date(),
            footer: {
                text: embedHandler.getFooter(),
                icon_url: member.guild.iconURL({ dynamic: true }) || botconfig.standartPicURL
            },
            thumbnail: {
                url: member.guild.iconURL({ dynamic: true }) || botconfig.standartPicURL
            }
        }]})
    }
}