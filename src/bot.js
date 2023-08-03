require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const {
  ActionRowBuilder,
  Client,
  GatewayIntentBits,
  InteractionType,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
const discordBotConfig = require("./config/discordBot.config");
const { writeToGoogleSheet, list } = require("./utils/googleDocs.util");

try {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
  });

  client.on("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand()) {
      if (interaction.commandName === "add") {
        const modal = new ModalBuilder()
          .setTitle("Add Job Vacancy")
          .setCustomId("addModal")
          .setComponents(
            new ActionRowBuilder().setComponents(
              new TextInputBuilder()
                .setLabel("posisi")
                .setCustomId("posisi")
                .setStyle(TextInputStyle.Short)
                .setRequired(false)
            ),
            new ActionRowBuilder().setComponents(
              new TextInputBuilder()
                .setLabel("perusahaan")
                .setCustomId("perusahaan")
                .setStyle(TextInputStyle.Short)
                .setRequired(false)
            ),
            new ActionRowBuilder().setComponents(
              new TextInputBuilder()
                .setLabel("link")
                .setCustomId("link")
                .setStyle(TextInputStyle.Paragraph)
                .setPlaceholder(`Kalau mager isi link aja`)
            )
          );
        interaction.showModal(modal);
      } else if (interaction.commandName === "bulk") {
        const modal = new ModalBuilder()
          .setTitle("Add Job Vacancy")
          .setCustomId("bulkModal")
          .setComponents(
            new ActionRowBuilder().setComponents(
              new TextInputBuilder()
                .setLabel("link")
                .setCustomId("link")
                .setStyle(TextInputStyle.Paragraph)
                .setPlaceholder(
                  `Kalau mager isi link aja yang banyak, pisah pakai enter, batas 4000 char ya`
                )
            )
          );
        interaction.showModal(modal);
      } else if (interaction.commandName === "list") {
        if (interaction.options.getString("filter")) {
          const filter = interaction.options.getString("filter");

          const message = await list(filter);

          return interaction.reply({
            content: message,
          });
        }

        return interaction.reply({
          content:
            "Kepanjangan ya, coba filter dulu atau cek Dokumen lengkap ada di https://bit.ly/jobregceh",
        });
      }
    } else if (interaction.type === InteractionType.ModalSubmit) {
      if (interaction.customId === "addModal") {
        writeToGoogleSheet([
          [
            "=ROW()-1",
            interaction.fields.getTextInputValue("posisi"),
            interaction.fields.getTextInputValue("perusahaan"),
            interaction.fields.getTextInputValue("link"),
            "FALSE",
          ],
        ]);

        interaction.reply({
          content: `${interaction.fields.getTextInputValue("posisi")}
${interaction.fields.getTextInputValue("perusahaan")}
${interaction.fields.getTextInputValue("link")}
        `,
        });
      } else if (interaction.customId === "bulkModal") {
        const links = interaction.fields.getTextInputValue("link").split("\n");

        const mappedLinks = links.map((link) => {
          return ["=ROW()-1", null, null, link, "FALSE"];
        });
        writeToGoogleSheet(mappedLinks);

        interaction.reply({
          content: `
${links.join("\n")}
Document Job Vacancy telah diupdate, silahkan cek : https://bit.ly/jobregceh`,
        });
      }
    }
  });

  const eventsPath = path.join(__dirname, "events");
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }

  client.login(discordBotConfig.DISCORD_BOT_TOKEN);
} catch (err) {
  console.log(err);
}
