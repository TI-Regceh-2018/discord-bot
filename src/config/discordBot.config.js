require("dotenv").config();

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_BOT_CLIENT_ID = process.env.DISCORD_BOT_CLIENT_ID;
const DISCORD_BOT_GUILD_ID = process.env.DISCORD_BOT_GUILD_ID;
const DISCORD_BOT_CHANNEL_ID = process.env.DISCORD_BOT_CHANNEL_ID;

module.exports = {
  DISCORD_BOT_TOKEN,
  DISCORD_BOT_CLIENT_ID,
  DISCORD_BOT_GUILD_ID,
  DISCORD_BOT_CHANNEL_ID,
};