const cron = require("node-cron");
const { list } = require("../utils/googleDocs.util");
const env = require("../configs/env.config");

module.exports = async (channel) => {
    const jobVacancy = await list();
    const greetingMessage = [
        "Hey, ready for today's job scoop?",
        "Yo, time for your daily dose of job options!",
        "Hey there! Let's see what job's on the menu today:",
        "Hello, job explorer! Here's your mission for today:",
        "Hey friend, it's job o'clock! Check this out:",
    ];

    // GMT + 0 on render
    if (env.discordBot.event.dailyJob.isEnabled == "true") {
        cron.schedule(env.discordBot.event.dailyJob.cronSchedule, () => {
            const text = `${
                greetingMessage[
                    Math.floor(Math.random() * greetingMessage.length)
                ]
            }

${jobVacancy[Math.floor(Math.random() * jobVacancy.length)]
    .replace("<", "")
    .replace(">", "")}
    `;
            channel.send(text).then((message) => {
                setTimeout(() => {
                    message.delete();
                }, 1000 * 60 * 60 * 24);
            });
        });
    }
};
