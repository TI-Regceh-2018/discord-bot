const { SlashCommandBuilder } = require("discord.js");

const addJobVacancyCommand = new SlashCommandBuilder()
  .setName("add")
  .setDescription("Add a New Job Vacancy");

module.exports = addJobVacancyCommand.toJSON();
