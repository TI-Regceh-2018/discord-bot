const Logger = require("./libs/logger.lib");
const bannerLogger = require("./libs/banner.lib");
const winstonLoader = require("./loaders/winston.loader");
const monitorLoader = require("./loaders/monitor.loader");
const expressLoader = require("./loaders/express.loader");
const botLoader = require("./loaders/bot.loader");
const log = new Logger(__filename);

async function initApp() {
    winstonLoader();
    botLoader();

    const app = expressLoader();
    monitorLoader(app);
}

initApp()
    .then(() => bannerLogger(log))
    .catch((error) => log.error("Application is crashed: " + error));
