import * as express from 'express';
import * as webPanelConfig from '../configs/webPanel.json';
import * as index from '../index';
import * as banHandler from './banuser/banuser';
import * as changeUserNameHandler from './changeusername/changeusername';
import * as changeAvatarHandler from './changeavatar/changeavatar';
import * as fs from 'fs';
const app = express();
app.use(express.urlencoded({ extended: true }));

let ipArray: string[] = [];

export function startWebPanel() {
    app.post('/', (req, res) => {
        res.header('X-Powered-By', 'LvckyWorld.net');

        let ipCount = ipArray.filter(ip => ip == req.ip).length;
        // If IP is more than maxRequestsIfIPisNotVerified time's on array
        if (ipCount >= webPanelConfig.maxRequestsIfIPisNotVerified) {
            return res.status(403).send("Your IP is banned!");
        }

        if (String(req.headers['verify']) != String(webPanelConfig.verifyHeader)) {
            ipArray.push(req.ip);
            
            res.status(403).send("You are not allowed to access this page! If you try this again, you will be banned from this API for 1 day!");
            return;
        }

        switch (req.body.action) {
            case 'changeusername':
                changeUserNameHandler.changeUserName(req, res);
                break;
            case 'changeavatar':
                changeAvatarHandler.changeAvatar(req, res);
                break;
            case 'banuser':
                banHandler.banUser(req, res);
                break
            default:
                res.status(409).send("You have to choose a correct action. Now we have a CONFLICT!")
                break;
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
            if (err) return;
            res.header('X-Powered-By', 'LvckyWorld.net');
            res.send(data);
        });
    });


    app.listen(webPanelConfig.port);
    console.log('The Websocket started succsessfullly. It listen on port: ' + webPanelConfig.port);

}