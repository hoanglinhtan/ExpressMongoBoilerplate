import { loggerConfig } from '../config';
import Path from 'path';
import Winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

class Logger {
    constructor() {
        this.winstonLogger = Winston.createLogger({
            format: Winston.format.combine(
                Winston.format.timestamp(),
                Winston.format.printf((info) => {
                    return `${info.timestamp} [${info.level}]: ${
                        typeof info.message === 'object'
                            ? JSON.stringify(info.message)
                            : info.message
                    }`;
                })
            ),
            transports: this.createTransports(),
        });
    }

    createTransports() {
        const filePath = Path.resolve(__dirname, '..', '..', 'logs', 'event-log', '%DATE%.log');
        return [
            new DailyRotateFile({
                datePattern: loggerConfig.datePattern,
                filename: filePath,
                maxSize: loggerConfig.maxSize,
                maxFiles: loggerConfig.maxFiles,
            }),
        ];
    }

    error(message) {
        this.onDebug(message);
        this.winstonLogger.error(this.convertMessage(message));
    }

    verbose(message) {
        this.onDebug(message);
        this.winstonLogger.verbose(this.convertMessage(message));
    }

    onDebug(message) {
        if (process.env.NODE_ENV === 'development') {
            console.log(message);
        }
    }

    convertMessage(message) {
        if (typeof message === 'string') {
            return message;
        }
        if (message instanceof Error) {
            return message.stack || message.message;
        }
        return JSON.stringify(message);
    }
}

export default new Logger();
