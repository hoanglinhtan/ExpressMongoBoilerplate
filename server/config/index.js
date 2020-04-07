import DotENV from 'dotenv';
DotENV.config();

import Path from 'path';
import FS from 'fs';

const env = process.env.NODE_ENV;

module.exports = {
    port: process.env.PORT,
    env,
    loggerConfig: JSON.parse(
        FS.readFileSync(Path.resolve(__dirname, 'logger-config.json'), {
            encoding: 'utf-8',
        })
    ),
    authConfig: JSON.parse(
        FS.readFileSync(Path.resolve(__dirname, 'auth-config.json'), {
            encoding: 'utf-8',
        })
    ),
    dbConfig: JSON.parse(
        FS.readFileSync(Path.resolve(__dirname, 'database-config.json'), {
            encoding: 'utf-8',
        })
    )[env],
    jwtKey: FS.readFileSync(Path.resolve(__dirname, 'jwt.key'), {
        encoding: 'utf-8',
    }),
    whiteListConfig: JSON.parse(
        FS.readFileSync(Path.resolve(__dirname, 'white-list.json'), {
            encoding: 'utf-8',
        })
    ),
};
