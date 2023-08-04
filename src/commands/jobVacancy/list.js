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

    let listJob = (await list(filter)).join("\n");

    if (!listJob) {
      return interaction.reply({
        content: `Tidak ada job vacancy dengan keyword ${filter}`,
      });
    }

    const header = filter
      ? `List job vacancy dengan keyword: ${filter}`
      : `List job vacancy`;
    let message = "";

    if (listJob.length > 2000) {
      const result = listJob.substring(0, 1800).split("\n");
      result.pop();

      message = message.concat(
        header,
        "\n\n",
        result.join("\n"),
        `\n\nKepanjangan listnya, liat aja langsung di <https://bit.ly/jobregceh>`
      );
    } else {
      message = message.concat(
        header,
        "\n\n",
        listJob,
        `\n\nDokumen lengkap ada di <https://bit.ly/jobregceh>`
      );
    }

    return interaction.reply({
      content: message,
    });
  },
};
