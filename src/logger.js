const fs = require("fs");

const logStream = fs.createWriteStream("./bot.log", { flags: "a" });

const logger = (type, message) => {
  const currentTime = new Date().toISOString();
  const logMessage = `${currentTime} ${type.toUpperCase()}: ${message}\n`;
  logStream.write(logMessage);
  logStream.close();
};

module.exports = {
  logger,
};
