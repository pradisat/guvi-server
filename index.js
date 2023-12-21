require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const port = process.env.PORT || 4501;
const cookietParser = require("cookie-parser");

app.use("/www", express.static("www"));
app.use(cookietParser());
app.use(express.json());
app.use("/api", require("./lib/api/index"));
app.use("*", require("./lib/controller/www"));

let server = app.listen(port);

require("./lib/service/connecttomongo")(server);
