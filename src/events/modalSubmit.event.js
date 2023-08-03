const { Events, InteractionType } = require("discord.js");
const { writeToGoogleSheet } = require("../utils/googleDocs.util");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.type === InteractionType.ModalSubmit) {
      if (interaction.customId === "addModal") {
        writeToGoogleSheet([
          [
            "=ROW()-1",
            interaction.fields.getTextInputValue("positionInput"),
            interaction.fields.getTextInputValue("companyInput"),
            interaction.fields.getTextInputValue("linkInput"),
            "FALSE",
          ],
        ]);

        interaction.reply({
          content: `[${interaction.fields.getTextInputValue(
            "positionInput"
          )} - ${interaction.fields.getTextInputValue(
            "companyInput"
          )}](${interaction.fields.getTextInputValue("linkInput")})`,
        });
      } else if (interaction.customId === "bulkModal") {
        const links = interaction.fields
          .getTextInputValue("linkInput")
          .split("\n");

        const mappedLinks = links.map((link) => {
          return ["=ROW()-1", null, null, link, "FALSE"];
        });
        writeToGoogleSheet(mappedLinks);

        interaction.reply({
          content: `${links.join("\n")}

Document Job Vacancy telah diupdate, silahkan cek : https://bit.ly/jobregceh`,
        });
      }
    }
  },
};
