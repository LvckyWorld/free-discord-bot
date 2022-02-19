import * as express from 'express';
import * as webPanelConfig from '../../configs/webPanel.json';
import * as index from '../../index';

export function banUser(req: express.Request, res: express.Response) {
    if (req.body.id != (undefined || null)) {
        index.bot.guilds.cache.map(guild => {
            if (req.body.reason != (undefined || null)) {
                guild.members.ban(req.body.id, {reason: req.body.reason}).then(() => {
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
                guild.members.ban(req.body.id, {reason: req.body.reason}).then(() => {
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