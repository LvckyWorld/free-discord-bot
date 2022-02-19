import * as express from 'express';
import * as webPanelConfig from '../configs/webPanel.json';
import * as index from '../index';
import * as banHandler from './banuser/banuser';
import * as changeUserNameHandler from './changeusername/changeusername';
import * as fs from 'fs';
const app = express();
app.use(express.urlencoded( { extended: true } ));

let ipArray: string[] = [];

export function startWebPanel() {
    app.post('/', (req, res) => {
        res.header('X-Powered-By', 'LvckyWorld.net');
        
        let ipCount = ipArray.filter(ip => ip == req.ip).length;
        // If IP is more than maxRequestsIfIPisNotVerified time's on array
        if (ipCount >= webPanelConfig.maxRequestsIfIPisNotVerified) {
            return res.status(403).send("Your IP is banned!");
        }
        
        if (req.body.action == (undefined || null)) return res.status(403).send("Your IP wasn't found");

        if (req.headers['verify'] != webPanelConfig.verifyHeader) {
            ipArray.push(req.ip);
            
            res.status(403).send("You are not allowed to access this page! If you try this again, you will be banned from this API for 1 day!");
            return;
        }

        if (req.body.action == 'changeusername') {
            changeUserNameHandler.changeUserName(req, res);
        }
        if (req.body.action == 'banuser') {
            banHandler.banUser(req, res);
        }
    });

    app.get("/userlist", (req, res) => {
        
        let json: { id: string; name: string; tag: string; avatarURL: string | null; }[] = [];
        res.header('X-Powered-By', 'LvckyWorld.net');
        index.bot.guilds.cache.forEach(guild => {
            guild.members.cache.forEach(member => {
                let newJsonObject = {
                    id: member.id,
                    name: member.user.username,
                    tag: member.user.discriminator,
                    avatarURL: member.user.avatarURL({ dynamic: true }),
                }
                json.push(newJsonObject);
            })
        })

        res.send(JSON.stringify(json));
    });
    app.get("/admins", (req, res) => {
        fs.readFile(__dirname + '/admins.json', (err, data) => {
            console.log(err)
            if (err) return;
            res.header('X-Powered-By', 'LvckyWorld.net');
            res.send(data);
        });
    });
    
    
    app.listen(webPanelConfig.port);
}