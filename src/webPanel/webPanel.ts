import * as express from 'express';
import * as webPanelConfig from '../configs/webPanel.json';
const app = express();
app.use(express.urlencoded());

export function startWebPanel() {
    app.post('/', (req, res) => {
        console.log(req.body);
        res.send('ok');
    });
    
    
    app.listen(webPanelConfig.port);
}