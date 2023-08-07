const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add")
    .setDescription("Add a new job vacancy"),
  async execute(interaction) {
    console.log("Add a New Job Vacancy");
  },
};
