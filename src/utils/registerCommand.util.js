const { Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { addJobVacancyCommand } = require("../commands");
const discordBotConfig = require("../config/discordBot.config");
const rest = new REST({ version: "10" }).setToken(
  discordBotConfig.DISCORD_BOT_TOKEN
);

const commands = [addJobVacancyCommand];

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(
      Routes.applicationGuildCommands(
        discordBotConfig.DISCORD_BOT_CLIENT_ID,
        discordBotConfig.DISCORD_BOT_GUILD_ID
      ),
      {
        body: commands,
      }
    );
    console.log("Successfully reloaded application (/) commands.");
  } catch (err) {
    console.log(err);
  }
})();
