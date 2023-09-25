const compression = require("compression");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const xss = require("xss-clean");
const env = require("../configs/env.config");
const indexRouter = require("../routes/index");
const {
    errorConverter,
    errorHandler,
} = require("../middlewares/error.middleware");

module.exports = () => {
    const app = express();

    app.use(morgan("dev"));
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(xss());
    app.use(compression());
    app.use(cors());
    app.options("*", cors());

    app.use(env.app.routePrefix, indexRouter);
    app.use(errorConverter);
    app.use(errorHandler);
    app.listen(env.app.port);

    return app;
};
