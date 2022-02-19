import * as Discord from "discord.js";
import * as embedHandler from "../util/embedHandler";
import * as autoEmbedConfig from "../configs/autoEmbed.json";
export function autoEmbed(message: Discord.Message) {
    if (message.author.bot) return;
    autoEmbedConfig.channels.map(channelID => {
        if (channelID.startsWith("vote_")) {
            let rightChannelID = channelID.replace("vote_", "");
            if (rightChannelID === message.channel.id) {
                message.channel.send({embeds: [embedHandler.announceEmbed("📢 Umfrage 📢", message.content, "RANDOM", message)]}).then(msg => {msg.react("✅"); msg.react("❌");});
                message.delete();
            }
        } else {
            let rightChannelID = channelID;
            if (rightChannelID === message.channel.id) {
                message.channel.send({embeds: [embedHandler.announceEmbed("📢 Announcement 📢", message.content, "RANDOM", message)]});
                message.delete();
            }
        }
    })
}