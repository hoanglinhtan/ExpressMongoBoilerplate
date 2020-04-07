import DotENV from 'dotenv';
import Path from 'path';
import FS from 'fs-extra';

DotENV.config();

const dbConfig = FS.readJsonSync(Path.resolve(__dirname, 'database-config.json'));

const DB_HOST = FS.readFileSync(Path.resolve(__dirname, 'credentials', 'DB_HOST'), {
    encoding: 'utf-8',
});

const DB_USER = FS.readFileSync(Path.resolve(__dirname, 'credentials', 'DB_USER'), {
    encoding: 'utf-8',
});

const DB_PASS = FS.readFileSync(Path.resolve(__dirname, 'credentials', 'DB_PASS'), {
    encoding: 'utf-8',
});

module.exports = {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    loggerConfig: FS.readJsonSync(Path.resolve(__dirname, 'logger-config.json')),
    authConfig: FS.readJsonSync(Path.resolve(__dirname, 'auth-config.json')),
    dbConfig: {
        ...dbConfig,
        host: DB_HOST,
        user: DB_USER,
        pass: DB_PASS,
    },
    whiteListConfig: FS.readJsonSync(Path.resolve(__dirname, 'white-list.json')),
};
