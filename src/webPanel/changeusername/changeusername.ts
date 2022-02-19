import * as express from 'express';
import * as webPanelConfig from '../../configs/webPanel.json';
import * as index from '../../index';

export function changeUserName(req: express.Request, res: express.Response) {
    if (req.body.name != (undefined || null)) {
        index.bot.user?.setUsername(req.body.name).then(() => {
            res.send({
                status: 'success',
                message: 'Username changed successfully!'
            });
        }).catch(err => {
            res.send({
                status: 'failed',
                message: 'You changed your username but it failed!',
                error: err
            });
        })

    }
}