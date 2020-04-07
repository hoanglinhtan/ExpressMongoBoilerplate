import DotENV from 'dotenv';
DotENV.config();

import Path from 'path';
import FS from 'fs-extra';

const env = process.env.NODE_ENV;

module.exports = {
    port: process.env.PORT,
    env,
    loggerConfig: FS.readJsonSync(Path.resolve(__dirname, 'logger-config.json')),
    authConfig: FS.readJsonSync(Path.resolve(__dirname, 'auth-config.json')),
    dbConfig: FS.readJsonSync(Path.resolve(__dirname, 'database-config.json'))[env],
    jwtKey: FS.readFileSync(Path.resolve(__dirname, 'jwt.key'), {
        encoding: 'utf-8',
    }),
    whiteListConfig: FS.readJsonSync(Path.resolve(__dirname, 'white-list.json')),
};
