const dotenv = require("dotenv");
const path = require("path");

const pkg = require("../../package.json");
const {
    getOsEnvOptional,
    getOsEnv,
    normalizePort,
    toBool,
    toNumber,
} = require("../libs/os.lib");

dotenv.config({
    path: path.join(
        process.cwd(),
        `.env${process.env.NODE_ENV === "test" ? ".test" : ""}`
    ),
});

const env = {
    node: process.env.NODE_ENV || "development",
    isProduction: process.env.NODE_ENV === "production",
    isTest: process.env.NODE_ENV === "test",
    isDevelopment: process.env.NODE_ENV === "development",
    app: {
        name: getOsEnv("APP_NAME"),
        version: pkg.version,
        description: pkg.description,
        host: getOsEnv("APP_HOST"),
        schema: getOsEnv("APP_SCHEMA"),
        routePrefix: getOsEnv("APP_ROUTE_PREFIX"),
        port: normalizePort(process.env.PORT || getOsEnv("APP_PORT")),
        banner: toBool(getOsEnv("APP_BANNER")),
    },
    discordBot: {
        token: getOsEnv("DISCORD_BOT_TOKEN"),
        clientID: getOsEnv("DISCORD_BOT_CLIENT_ID"),
        guildID: getOsEnv("DISCORD_BOT_GUILD_ID"),
        channelID: getOsEnv("DISCORD_BOT_CHANNEL_ID"),
        event: {
            dailyJob: {
                isEnabled: getOsEnv("EVENT_DAILY_JOB_ENABLED"),
                cronSchedule: getOsEnv("EVENT_DAILY_JOB_CRON_SCHEDULE"),
            },
        },
    },
    log: {
        level: getOsEnv("LOG_LEVEL"),
        json: toBool(getOsEnvOptional("LOG_JSON")),
        output: getOsEnv("LOG_OUTPUT"),
    },
    googleAPI: {
        keyfile: getOsEnv("GOOGLE_APIS_KEYFILE"),
        spreadsheetID: getOsEnv("GOOGLE_APIS_SPREADSHEET_ID"),
        spreadsheetTabName: getOsEnv("GOOGLE_APIS_SPREADSHEET_TAB_NAME"),
    },
    monitor: {
        enabled: toBool(getOsEnv("MONITOR_ENABLED")),
        route: getOsEnv("MONITOR_ROUTE"),
        username: getOsEnv("MONITOR_USERNAME"),
        password: getOsEnv("MONITOR_PASSWORD"),
    },
    swagger: {
        enabled: toBool(getOsEnv("SWAGGER_ENABLED")),
        route: getOsEnv("SWAGGER_ROUTE"),
        username: getOsEnv("SWAGGER_USERNAME"),
        password: getOsEnv("SWAGGER_PASSWORD"),
    },
};

module.exports = env;
