import * as express from 'express';
import * as webPanelConfig from '../configs/webPanel.json';
import * as index from '../index';
import * as banHandler from './banuser/banuser';
import * as changeUserNameHandler from './changeusername/changeusername';
const app = express();
app.use(express.urlencoded( { extended: true } ));

export function startWebPanel() {
    app.post('/', (req, res) => {
        if (req.body.action == (undefined || null)) return;
        res.header('X-Powered-By', 'LvckyWorld.net');
        if (req.headers['verify'] != webPanelConfig.verifyHeader) return res.sendStatus(403);
        
        if (req.body.action == 'changeusername') {
            changeUserNameHandler.changeUserName(req, res);
        }
        if (req.body.action == 'banuser') {
            banHandler.banUser(req, res);
        }
    });
    
    
    app.listen(webPanelConfig.port);
}