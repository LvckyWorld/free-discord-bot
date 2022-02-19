import * as express from 'express';
import * as webPanelConfig from '../configs/webPanel.json';
import * as index from '../index';
const app = express();
app.use(express.urlencoded( { extended: true } ));

export function startWebPanel() {
    app.post('/', (req, res) => {
        if (req.body.action == (undefined || null)) return;
        res.header('X-Powered-By', 'LvckyWorld');
        if (req.body.action == 'changeusername') {
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
    });
    
    
    app.listen(webPanelConfig.port);
}