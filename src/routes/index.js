var express = require("express");
var router = express.Router();
const package = require("../../package.json");

router.get("/", function (req, res, next) {
  res.status(200).json({
    name: package.name,
    version: package.version,
    status: "OK",
  });
});

module.exports = router;
