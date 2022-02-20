import * as express from 'express';
import * as webPanelConfig from '../../configs/webPanel.json';
import * as index from '../../index';
import * as embedHandler from '../../util/embedHandler';
import * as Discord from 'discord.js';
import * as botconf from '../../configs/botconfig.json';

export function banUser(req: express.Request, res: express.Response) {
    if (req.body.id != (undefined || null)) {
        index.bot.guilds.cache.map(guild => {
            if (req.body.reason != (undefined || null)) {
                guild.members.fetch(req.body.id).then(member => {
                    let embed = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle('💥 BAN-SYSTEM 💥')
                        .setDescription(`Your banned from the Server \n Reason: No reason defined.`)
                        .setAuthor({ name: `Request by: Webpanel`, iconURL: (botconf.standartPicURL) })
                        .setFooter(embedHandler.getFooter())
                        .setTimestamp(new Date())
                        .setThumbnail((guild.iconURL({ dynamic: true }) || botconf.standartPicURL));
                    member.send({
                        embeds: [embed]
                    }).catch((err) => { })
                }).catch((err) => { })
                guild.members.ban(req.body.id, { reason: req.body.reason }).then(() => {
                    res.send({
                        status: 'success',
                        message: 'User banned successfully for "' + req.body.reason + '"'
                    });
                }).catch(err => {
                    res.send({
                        status: 'failed',
                        message: 'You banned the user but it failed!',
                        error: err
                    });
                })
            } else {
                guild.members.fetch(req.body.id).then(member => {
                    let embed = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle('💥 BAN-SYSTEM 💥')
                        .setDescription(`Your banned from the Server \n Reason: ${req.body.reason}.`)
                        .setAuthor({ name: `Request by: Webpanel`, iconURL: (botconf.standartPicURL) })
                        .setFooter(embedHandler.getFooter())
                        .setTimestamp(new Date())
                        .setThumbnail((guild.iconURL({ dynamic: true }) || botconf.standartPicURL));
                    member.send({
                        embeds: [embed]
                    }).catch((err) => { })
                }).catch((err) => { })
                guild.members.ban(req.body.id, { reason: req.body.reason }).then(() => {
                    res.send({
                        status: 'success',
                        message: 'User banned successfully for no reason'
                    });
                }).catch(err => {
                    res.send({
                        status: 'failed',
                        message: 'You banned the user but it failed!',
                        error: err
                    });
                })
            }
        })
    }
}