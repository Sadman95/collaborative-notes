import {} from "winston-daily-rotate-file"
import { createLogger } from "winston";
import { consoleTransport, errorFileTransport, infoFileTransport } from "./loggerTransports";

export const logger = createLogger({
  transports: [
    consoleTransport,
    errorFileTransport,
    infoFileTransport,
  ],
})
