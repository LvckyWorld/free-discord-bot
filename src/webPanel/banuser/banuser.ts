import * as express from 'express';
import * as webPanelConfig from '../../configs/webPanel.json';
import * as index from '../../index';
import * as embedHandler from '../../util/embedHandler';
import * as Discord from 'discord.js';
import * as botconf from '../../configs/botconfig.json';

export async function banUser(req: express.Request, res: express.Response) {
    var reason = await (req.body.reason == undefined || req.body.reason == null ? 'No reason defined.' : req.body.reason);
    if (req.body.id != (undefined || null)) {
        index.bot.guilds.cache.map(async guild => {
            if (req.body.reason != (undefined || null)) {
                await guild.members.fetch(req.body.id).then(member => {
                    let embed = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle('💥 BAN-SYSTEM 💥')
                        .setDescription(`Your banned from the Server ${guild?.name}\n\n Reason: \`${reason}\``,)
                        .setAuthor({ name: `Request by: Webpanel`, iconURL: (botconf.standartPicURL) })
                        .setFooter({ text: embedHandler.getFooter() })
                        .setTimestamp(new Date())
                        .setThumbnail((guild.iconURL({ dynamic: true }) || botconf.standartPicURL));
                    member.send({
                        embeds: [embed]
                    }).catch((err) => {
                        console.log(err);
                    })
                }).then(() => {
                    setTimeout(() => {
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
                    }, 1000 * 2)

                }).catch((err) => { })
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