import * as express from 'express';
import * as webPanelConfig from '../../configs/webPanel.json';
import * as index from '../../index';

export function changeAvatar(req: express.Request, res: express.Response) {
    if (req.body.avatarurl != (undefined || null)) {
        index.bot.user?.setAvatar(req.body.avatarurl).then(() => {
            res.send({
                status: 'success',
                message: 'Avatar changed successfully!'
            });
            console.log(`Changed the Avatar by Adminpanel to ${req.body.avatarurl}`);
        }).catch(err => {
            res.send({
                status: 'failed',
                message: 'You changed your avatar but it failed!',
                error: err
            });
            console.log(`Avatar change failed by Adminpanel: ${err}`);
        })

    }
}