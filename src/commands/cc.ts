import * as Discord from 'discord.js';
import * as embedHandler from '../util/embedHandler';

export async function execute(message: Discord.Message, args: string[], bot: Discord.Client) {

    if (message.member?.permissions.has("MANAGE_MESSAGES")) {

        if (args.length == 1) {

            if (args[0].match(/^[0-9]+$/)) {

                await (message.deletable ? message.delete() : {})

                let deleteAmmount;

                if (parseInt(args[0]) > 100) {
                    deleteAmmount = 100;
                } else {
                    deleteAmmount = parseInt(args[0]);
                }

                var channel = message.channel as any;
                channel.bulkDelete(deleteAmmount, true)
                    .then((deleted: { size: any; }) => {
                        message.channel.send({
                            embeds: [embedHandler.standardEmbed(
                                `💬 CHATCLEAR`,
                                `I deleted ${deleted.size} messages. c:`,
                                'RANDOM', message
                            )]
                        }).then(async (msg) => {
                            await setTimeout(async () => {
                                await (msg.deletable ? msg.delete() : {})
                            }, 1000 * 5);
                        });
                    }).catch((err: any) => {
                        embedHandler.error(
                            `Something went wrong :C\n\n||\`${err}\`||`, message
                        )
                    });

            } else
                return message.reply({
                    embeds: [embedHandler.syntaxError(
                        'cc <ammount>', message
                    )]
                })

        } else
            return message.reply({
                embeds: [embedHandler.syntaxError(
                    'cc <ammount>', message
                )]
            })

    } else
        return message.reply({ embeds: [embedHandler.noPerms('MANAGE_MESSAGES', message)] })

}