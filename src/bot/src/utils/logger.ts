import fs from "fs";
import path from "path";

const logFilePath = path.resolve(__dirname, "../../bot.log");
const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

const logger = (type: string, message: string) => {
  const currentTime = new Date().toISOString();
  const logMessage = `${currentTime} ${type.toUpperCase()}: ${message}\n`;
  logStream.write(logMessage);
  logStream.close();
};

export { logger };
