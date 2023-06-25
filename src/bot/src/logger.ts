import fs from "fs";

const logStream = fs.createWriteStream("../bot.log", { flags: "a" });

export const logger = (type: string, message: string) => {
  const currentTime = new Date().toISOString();
  const logMessage = `${currentTime} ${type.toUpperCase()}: ${message}\n`;
  logStream.write(logMessage);
  logStream.close();
};
