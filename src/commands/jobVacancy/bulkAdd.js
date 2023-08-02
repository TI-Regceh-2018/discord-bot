const { SlashCommandBuilder } = require("discord.js");

const bulkInsertJobVacancyCommand = new SlashCommandBuilder()
  .setName("bulk")
  .setDescription("Bulk Insert New Job Vacancy");

module.exports = bulkInsertJobVacancyCommand.toJSON();
