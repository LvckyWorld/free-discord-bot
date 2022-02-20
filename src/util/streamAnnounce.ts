import * as Discord from "discord.js";
import * as streamannounceconf from "../configs/streamAnnounce.json"

let streamerMap: string[] = [];

export async function sendAnnounce(oldPresence: Discord.Presence | null, newPresence: Discord.Presence) {
    try {

        if (newPresence.user?.bot) return;
        streamannounceconf.streamer_roles.forEach((roleid) => {
            if (newPresence.guild?.roles.cache.map(role => { role.id == roleid })) {
                if (oldPresence?.guild?.roles.cache.map(role => { role.id == roleid })) {
                    let userID = newPresence.userId;
                    let member = newPresence.guild.members.cache.get(userID);
                    var channels = streamannounceconf.channels.forEach(id => {


                        let activity: any;
                        // if (userID != "447285957004099584") return;
                        newPresence.activities.map(activity1 => {
                            activity = activity1;
                        })
                        if (activity === undefined) return;
                        if (activity.type == "PLAYING") {


                            if (streamerMap.includes(userID)) return;
                            if (!member?.roles.cache.has(roleid)) return;
                            let plattForm = activity.name;
                            let url = activity.url;
                            //if (url === (undefined || null)) return;
                            streamerMap.push(userID);
                            deleteUserFromMap(userID);



                            let sendString = streamannounceconf.message;
                            sendString = sendString.replace('$mention', `<@${newPresence.userId}>`);
                            sendString = sendString.replace('$streamurl', (url || '$streamrul'))

                            streamannounceconf.channels.forEach(chid => {
                                var annChannel: any = newPresence.guild?.channels.fetch(chid).then((channel) => annChannel = channel).then(() => {
                                    annChannel.send(sendString);
                                });
                            })
                        }
                    })
                }
            }
        })

        async function deleteUserFromMap(userID: string) {
            setTimeout(() => {
                streamerMap.splice(streamerMap.indexOf(userID), 1);
            }, 1000 * 60 * 60 * 3);
        }

    } catch (e) { }
}
