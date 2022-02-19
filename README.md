# TypeScript Discord Bot


This Bot is full moudlar.
You can use the configuration files to set everything up to suit you and your project.

## Before you can start the Bot

First you have to install [NodeJS](https://nodejs.org/) with the version 16.
Now you have to open an command prompt and write the command `npm i`.
Then npm download all required packages for you. If this is done, you have to configurate your bot and the BotToken.


To configurate the BotToken you need to create a file with the name ".env"
The content in ".env" file:
```js

BOT_TOKEN = token

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
