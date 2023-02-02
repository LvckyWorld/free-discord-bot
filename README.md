# TypeScript Discord Bot


This Bot is full modular.
You can use the configuration files to set everything up to suit you and your project.


#### Contents:
- [Before you can start the Bot](#before-you-can-start-the-bot)
- [Commands](#commands)
- [Extend the bot](#extend-the-bot)
- [Restful API](#restful-api)
- [Example Panel](#example-panel)


## Before you can start the Bot

First you have to install [NodeJS](https://nodejs.org/) with the version 16.
Now you have to open an command prompt and write the command `npm i`.
Then npm download all required packages for you. Further you have to run this command: 
```
npm i -g ts-node typescript
```
If this is done, you have to configurate your bot and the BotToken.


To configurate the BotToken you need to create a file with the name ".env"
The content in ".env" file:
```js

BOT_TOKEN = token

```

Then you write in the prompt the command `ts-node src/index.ts`

If you want to disable modules, simply write `--` in front of the file like this.

![image](https://user-images.githubusercontent.com/47639297/155397964-aa425512-5d3d-4dbc-a78a-601a736ac3ec.png)

Then the module is no longer loaded.

## Commands
![image](https://user-images.githubusercontent.com/54581078/154839019-8e8ff64f-f3f6-42c3-a2a4-470d79b084af.png)


## Extend the bot
If you would like to create new command, we have a very simple instruction for you.
In the folder `commands`, you simply have to create a new file. In this file you have to put some code.
We give you a simple code example:

Filename: `ping.ts` 
```ts

/*
The new commandname is the name of the file without `.ts`.
ping.ts = prefix+ping
*/

import * as Discord from 'discord.js';
export async function execute(message: Discord.Message, args: string[], bot: Discord.Client) {
    
    // command
    if (message.member.permission.has("ADMINISTRATOR")) {
        message.reply("Pong")
    }
    
}
```

## Restful API
The API uses urlencoded.

You have to set the verify header in the Config first.

If you done that you can set the verify header in your POST request.

Actions
- changeusername
- banuser


### changeusername
Body
- action => changeusername
- name   => [NEWUSERNAME]

![image](https://user-images.githubusercontent.com/54581078/154807834-cceaad0a-31ea-4483-a1be-75c42814254b.png)

### banuser
Body
- action => banuser
- id     => [USERID]
- reason => [REASON]

![image](https://user-images.githubusercontent.com/54581078/154807969-0e16e8b6-c1db-4f4e-8eea-d11e5498c882.png)

## Example Panel
We created a [Web panel](https://github.com/LvckyWorld/free-discord-bot-webpanel) in PHP you can use und learn how to use the API.
You just have to set the config.json right:
```json
{
    "serverIP": "127.0.0.1",
    "port": "3000",
    "verifyHeader": "12345"
}
```

![image](https://user-images.githubusercontent.com/54581078/154838874-dcf611dd-d295-4da3-af9d-830818e7b9a8.png) 
![image](https://user-images.githubusercontent.com/54581078/154838888-8e5acdf9-8a7c-43ce-be09-e7f838f2b918.png)

![image](https://user-images.githubusercontent.com/54581078/154838926-3bdf84c5-ae1b-4890-a7e7-06c29430d586.png)

