const { Events, ActivityType } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`${client.user.tag} has logged in!`);
    client.user.setActivity({
      name: "Cara Membuat CV",
      type: ActivityType.Streaming,
      url: "https://www.youtube.com/watch?v=K33W-KyGpW0",
    });
  },
};
