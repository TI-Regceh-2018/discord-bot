const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows list of commands"),
  async execute(interaction) {
    const commands = interaction.client.commands;

    const data = [];
    data.push("Here's a list of all my commands:\n");
    data.push(
      commands
        .map((command) => {
          return `/${command.data.name} - ${command.data.description}`;
        })
        .join("\n")
    );

    data.push(
      "\nWanna to contribute a new command? [Lets Go!](<https://github.com/TI-Regceh-2018/discord-bot>)"
    );

    return interaction.reply({
      content: data.join("\n"),
      ephemeral: true,
    });
  },
};
