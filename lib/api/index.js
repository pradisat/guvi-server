const { Router } = require("express");
const authchecker = require("../middleware/authchecker");


const apiroutes = Router();

apiroutes.use("/auth", require("./auth"));
apiroutes.use("/user",authchecker, require("./user"));

module.exports = apiroutes;
