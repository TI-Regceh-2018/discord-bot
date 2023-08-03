const {
  ActionRowBuilder,
  Events,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "add") {
      const modal = new ModalBuilder()
        .setCustomId("addModal")
        .setTitle("Add Job Vacancy");

      const positionInput = new TextInputBuilder()
        .setCustomId("positionInput")
        .setLabel("Posisi Perkerjaan")
        .setRequired(false)
        .setStyle(TextInputStyle.Short);

      const companyInput = new TextInputBuilder()
        .setCustomId("companyInput")
        .setLabel("Perusahaan")
        .setRequired(false)
        .setStyle(TextInputStyle.Short);

      const linkInput = new TextInputBuilder()
        .setCustomId("linkInput")
        .setLabel("Kalau mager isi link aja")
        .setStyle(TextInputStyle.Paragraph);

      const firstActionRow = new ActionRowBuilder().addComponents(
        positionInput
      );
      const secondActionRow = new ActionRowBuilder().addComponents(
        companyInput
      );
      const thirdActionRow = new ActionRowBuilder().addComponents(linkInput);

      modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

      await interaction.showModal(modal);
    } else if (interaction.commandName === "bulk") {
      const modal = new ModalBuilder()
        .setCustomId("bulkModal")
        .setTitle("Add Job Vacancy");

      const linkInput = new TextInputBuilder()
        .setCustomId("linkInput")
        .setLabel("Links")
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder(
          `Kalau mager isi link aja yang banyak, pisah pakai enter, batas 4000 char ya`
        );
      const firstActionRow = new ActionRowBuilder().addComponents(linkInput);

      modal.addComponents(firstActionRow);

      await interaction.showModal(modal);
    }
  },
};
