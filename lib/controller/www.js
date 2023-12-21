const path = require("path");
module.exports = async function (req, res) {
  try {
    return res.status(200).sendFile(path.resolve("www/client/index.html"));
  } catch (error) {
    return res.status(500).send(`<h1>${error?.message}</h1>`);
  }
};
