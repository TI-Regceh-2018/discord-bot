const basicAuth = require("express-basic-auth");
const monitor = require("express-status-monitor");

const env = require("../configs/env.config");

module.exports = (app) => {
    app.use(
        monitor({
            title: env.app.name + " Monitor Page",
            theme: "default.css",
            path: "/monitor",
            spans: [
                {
                    interval: 1, // Every second
                    retention: 60, // Keep 60 datapoints in memory
                },
                {
                    interval: 5, // Every 5 seconds
                    retention: 60,
                },
                {
                    interval: 15, // Every 15 seconds
                    retention: 60,
                },
            ],
            chartVisibility: {
                cpu: true,
                mem: true,
                load: true,
                eventLoop: true,
                heap: true,
                responseTime: true,
                rps: true,
                statusCodes: true,
            },
            // healthChecks: [
            //   {
            //     protocol: "http",
            //     host: "localhost",
            //     path: "/admin/health/ex1",
            //     port: "3000",
            //   },
            // ],
        })
    );
    app.get(
        env.monitor.route,
        env.monitor.username
            ? basicAuth({
                  users: {
                      [`${env.monitor.username}`]: env.monitor.password,
                  },
                  challenge: true,
              })
            : (req, res, next) => next(),
        monitor().pageRoute
    );
};
