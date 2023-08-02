require("dotenv").config();
const {
  ActionRowBuilder,
  Client,
  GatewayIntentBits,
  InteractionType,
  ModalBuilder,
  Routes,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
const { REST } = require("@discordjs/rest");
const discordBotConfig = require("./config/discordBot.config");

const RegisterCommand = require("./commands/jobVacancy");
const { writeToGoogleSheet } = require("./utils/googleDocs.util");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const rest = new REST({ version: "10" }).setToken(
  discordBotConfig.DISCORD_BOT_TOKEN
);

client.on("ready", () => console.log(`${client.user.tag} has logged in!`));

client.on("interactionCreate", (interaction) => {
  if (interaction.isChatInputCommand()) {
    console.log("Chat Command");
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
    }
  } else if (interaction.type === InteractionType.ModalSubmit) {
    writeToGoogleSheet({
      posisi: interaction.fields.getTextInputValue("posisi"),
      perusahaan: interaction.fields.getTextInputValue("perusahaan"),
      link: interaction.fields.getTextInputValue("link"),
    });

    console.log("Modal Submitted...");
    if (interaction.customId === "addModal") {
      console.log(interaction.fields.getTextInputValue("posisi"));
      interaction.reply({
        content: `${interaction.fields.getTextInputValue(
          "posisi"
        )}  ${interaction.fields.getTextInputValue("perusahaan")}
${interaction.fields.getTextInputValue("link")}
        `,
      });
    }
  }
});

async function main() {
  const commands = [RegisterCommand];
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(
      Routes.applicationGuildCommands(
        discordBotConfig.DISCORD_BOT_CLIENT_ID,
        discordBotConfig.DISCORD_BOT_GUILD_ID
      ),
      {
        body: commands,
      }
    );
    client.login(discordBotConfig.DISCORD_BOT_TOKEN);
  } catch (err) {
    console.log(err);
  }
}

main();
