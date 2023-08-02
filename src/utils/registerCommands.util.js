const { Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
const {
  addJobVacancyCommand,
  bulkInsertJobVacancyCommand,
} = require("../commands");
const discordBotConfig = require("../config/discordBot.config");
const rest = new REST({ version: "10" }).setToken(
  discordBotConfig.DISCORD_BOT_TOKEN
);

const commands = [addJobVacancyCommand, bulkInsertJobVacancyCommand];

(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application  (/) commands.`
    );
    await rest.put(
      Routes.applicationGuildCommands(
        discordBotConfig.DISCORD_BOT_CLIENT_ID,
        discordBotConfig.DISCORD_BOT_GUILD_ID
      ),
      {
        body: commands,
      }
    );
    console.log(
      `Successfully reloaded ${commands.length} application (/) commands.`
    );
  } catch (err) {
    console.log(err);
  }
})();
