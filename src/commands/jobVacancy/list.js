const { SlashCommandBuilder } = require("discord.js");
const { list } = require("../../utils/googleDocs.util");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("list")
    .setDescription("List Job Vacancy")
    .addStringOption((option) =>
      option.setName("filter").setDescription("Filter List Job")
    ),
  async execute(interaction) {
    const filter = interaction.options.getString("filter") || "";
    const result = await list(filter);

    const message =
      result.length < 2000
        ? result
        : `${result.substring(0, 1900)}
...

Kepanjangan listnya, liat aja langsung di https://bit.ly/jobregceh`;

    return interaction.reply({
      content: message,
    });
  },
};
