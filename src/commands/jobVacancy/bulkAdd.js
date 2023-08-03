const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bulk")
    .setDescription("Bulk Insert New Job Vacancy"),
  async execute(interaction) {
    console.log("Bulk Insert New Job Vacancy");
  },
};
