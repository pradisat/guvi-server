const { createHash } = require("crypto");

module.exports = (txt) =>
  createHash("sha256").update(txt, "utf8").digest("hex");
