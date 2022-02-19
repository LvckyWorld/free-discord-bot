import { ColorResolvable, Guild, GuildMember, Interaction, Message, MessageEmbed } from "discord.js";

import * as botconf from '../configs/botconfig.json';

var year = new Date().getFullYear();
var ebFooter = `Bot by LvckyWorld | ©2016-${year} LvckyWorld`;

export function standardEmbed(title: string, description: string, color: ColorResolvable, message: Message) {
    var picURL = message.guild?.iconURL({ dynamic: true });
    let embed = new MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setAuthor({ name: `Request by: ${message.author.username}`, iconURL: (message.author.avatarURL({ dynamic: true }) || botconf.standartPicURL), url: `https://discordapp.com/users/${message.author.id}` })
        .setFooter({ text: ebFooter, iconURL: (picURL || botconf.standartPicURL) })
        .setTimestamp(new Date())
        .setThumbnail((picURL || botconf.standartPicURL));

    return embed;
}

export function error(error: string, message: Message) {
    var picURL = message.guild?.iconURL({ dynamic: true });
    let embed = new MessageEmbed()
        .setColor('RED')
        .setTitle(`:no_entry: ERROR - FEHLER :no_entry:`)
        .setDescription(error)
        .setAuthor({ name: `Request by: ${message.author.username}`, iconURL: (message.author.avatarURL({ dynamic: true }) || botconf.standartPicURL), url: `https://discordapp.com/users/${message.author.id}` })
        .setFooter({ text: ebFooter, iconURL: (picURL || botconf.standartPicURL) })
        .setTimestamp(new Date())
        .setThumbnail(picURL || botconf.standartPicURL);
    console.log(`\n\nEMBED error (getEmbed): \n ${embed.description} \n\n`)
    return embed;
}

export function noPerms(neededPerms: string, message: Message) {
    var picURL = message.guild?.iconURL({ dynamic: true });
    let embed = new MessageEmbed()
        .setColor('RED')
        .setTitle(`:no_entry: FEHLER -NO PERMS :no_entry:`)
        .setDescription(`<@${message.author.id}>, Sie haben leider keine Berechtigungen. Ihnen fehlt folgendes: \n\`${neededPerms}\``)
        .setAuthor({ name: `Request by: ${message.author.username}`, iconURL: (message.author.avatarURL({ dynamic: true }) || botconf.standartPicURL), url: `https://discordapp.com/users/${message.author.id}` })
        .setFooter({ text: ebFooter, iconURL: (picURL || botconf.standartPicURL) })
        .setTimestamp(new Date())
        .setThumbnail(picURL || botconf.standartPicURL);
    console.log(`\n\nEMBED noPerms (getEmbed): \n ${embed.description} \n\n`)
    return embed;
}

export function noRole(neededRoleID: string, message: Message) {
    var picURL = message.guild?.iconURL({ dynamic: true });
    let embed = new MessageEmbed()
        .setColor('RED')
        .setTitle(`:no_entry: NO PERMS :no_entry:`)
        .setDescription(`<@${message.author.id}>, Sie haben leider keine Berechtigungen. Ihnen fehlt folgendes: \n<@&${neededRoleID}>`)
        .setAuthor({ name: `Request by: ${message.author.username}`, iconURL: (message.author.avatarURL({ dynamic: true }) || botconf.standartPicURL), url: `https://discordapp.com/users/${message.author.id}` })
        .setFooter({ text: ebFooter, iconURL: (picURL || botconf.standartPicURL) })
        .setTimestamp(new Date())
        .setThumbnail(picURL || botconf.standartPicURL);
    console.log(`\n\nEMBED noRole (getEmbed): \n ${embed.description} \n\n`)
    return embed;
}
export function syntaxError(rightSyntax: string, message: Message) {
    var picURL = message.guild?.iconURL({ dynamic: true });
    let embed = new MessageEmbed()
        .setColor('RED')
        .setTitle(`:no_entry: Syntax-Fehler :no_entry:`)
        .setDescription(`<@${message.author.id}>, Sie verwenden eine falsche Sysntax. Richtige Syntax: \n\`${rightSyntax}\``)
        .setAuthor({ name: `Request by: ${message.author.username}`, iconURL: (message.author.avatarURL({ dynamic: true }) || botconf.standartPicURL), url: `https://discordapp.com/users/${message.author.id}` })
        .setFooter({ text: ebFooter, iconURL: (picURL || botconf.standartPicURL) })
        .setTimestamp(new Date())
        .setThumbnail(picURL || botconf.standartPicURL);
    console.log(`\n\nEMBED syntaxError: \n ${embed.description} \n\n`)
    return embed;
}

export function announceEmbed(title: string, description: string, color: ColorResolvable, message: Message) {
    var picURL = message.guild?.iconURL({ dynamic: true });
    let embed = new MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setAuthor({ name: `Announce by: ${message.author.username}`, iconURL: (message.author.avatarURL({ dynamic: true }) || botconf.standartPicURL), url: `https://discordapp.com/users/${message.author.id}` })
        .setFooter({ text: ebFooter, iconURL: (picURL || botconf.standartPicURL) })
        .setTimestamp(new Date())
        .setThumbnail(picURL || botconf.standartPicURL);
    console.log(`\n\nEMBED announceEmbed: \n ${embed.description} \n\n`)
    return embed;
}

export function voteEmbed(title: string, description: string, color: ColorResolvable, message: Message) {
    var picURL = message.guild?.iconURL({ dynamic: true });
    let embed = new MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setAuthor({ name: `Voting by: ${message.author.username}`, iconURL: (message.author.avatarURL({ dynamic: true }) || botconf.standartPicURL), url: `https://discordapp.com/users/${message.author.id}` })
        .setFooter({ text: ebFooter, iconURL: (picURL || botconf.standartPicURL) })
        .setTimestamp(new Date())
        .setThumbnail(picURL || botconf.standartPicURL);
    console.log(`\n\nEMBED voteEmbed: \n ${embed.description} \n\n`)
    return embed;
}