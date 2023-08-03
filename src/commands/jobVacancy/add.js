const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add")
    .setDescription("Add a New Job Vacancy"),
  async execute(interaction) {
    console.log("Add a New Job Vacancy");
  },
};
