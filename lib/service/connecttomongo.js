const mongoose = require("mongoose");
module.exports = async function (server) {
  try {
    console.log("connecting to mongo server.....");
    let connection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.clear();
    console.log("Mongo connection has been established");
    return connection;
  } catch (error) {
    console.log(error?.message);
    server.close();
  }
};
