const { SlashCommandBuilder } = require("discord.js");

const registerCommand = new SlashCommandBuilder()
  .setName("add")
  .setDescription("Add a New Job Vacancy");

module.exports = registerCommand.toJSON();
