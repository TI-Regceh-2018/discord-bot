# Discord Bot

Discord Bot that helped us to get an update about job information. This bot using spreadsheets as database as well.

# Command

| Slash Commands    | description                           |
| :---------------- | :------------------------------------ |
| `/add`            | Add new job information               |
| `/bulk`           | Add multiple job information          |
| `/list`           | List all job information              |
| `/list <keyword>` | List all job information with keyword |
| `/prune <amount>` | Prune message(s)                      |
| `/help`           | Show list of commands and description |

# Event

| Event           |
| :-------------- |
| Daily job offer |

## Run Locally

Clone the project

```bash
  git clone https://github.com/TI-Regceh-2018/discord-bot
```

Go to the project directory

```bash
  cd discord-bot
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run register && npm run start
```

btw you need to register bot account first before running the server
for more information you can check [here](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DISCORD_BOT_TOKEN`
`DISCORD_BOT_CLIENT_ID`
`DISCORD_BOT_GUILD_ID`
`DISCORD_BOT_CHANNEL_ID`

`GOOGLE_APIS_KEYFILE`
`GOOGLE_APIS_SPREADSHEET_ID`
`GOOGLE_APIS_SPREADSHEET_TAB_NAME`

`EVENT_DAILY_JOB`
`EVENT_DAILY_JOB_CRON_SCHEDULE`

## Tech Stack

NodeJS, ExpressJS
