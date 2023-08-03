const { SlashCommandBuilder } = require("discord.js");

const listJobVacancyCommand = new SlashCommandBuilder()
  .setName("list")
  .setDescription("List Job Vacancy")
  .addStringOption((option) =>
    option.setName("filter").setDescription("Filter List Job")
  );

module.exports = listJobVacancyCommand.toJSON();
