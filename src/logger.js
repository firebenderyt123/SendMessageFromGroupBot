const fs = require("fs");

const logStream = fs.createWriteStream("../bot.log", { flags: "a" });

const logError = (error) => {
  logStream.write(`Error: ${error}\n`);
  logStream.close();
};

module.exports = {
    logError
};