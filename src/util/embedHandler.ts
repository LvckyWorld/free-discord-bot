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