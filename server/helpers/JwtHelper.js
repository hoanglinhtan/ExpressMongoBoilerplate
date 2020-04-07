import Superman from 'lodash';
import JWT from 'jsonwebtoken';
import DotEnv from 'dotenv';
import Moment from 'moment';
import { userRepository } from '../repositories';

export default class JwtHelper {
    static authenticate = async ({ username, password }, lang) => {
        const user = await userRepository.getUser({ condition: { username } });
        if (user) {
            if (password !== user.password) {
                throw Error('PASSWORD_INCORRECT_ERROR');
            }
            user.id = user._id;
            return Superman.omit(user, ['_id', 'password']);
        } else {
            throw Error('EMAIL_NOT_FOUND_ERROR');
        }
    };

    static generateToken = (user, expireTime) => {
        const now = moment().unix();
        user = Superman.pick(user, ['email', 'id']);
        const payload = {
            iat: now,
            exp: now + expireTime,
            uid: user.id,
            user,
        };
        return JWT.sign(payload, DotEnv.jwt.key);
    };

    static verifyToken = (token, lang) => {
        const decodedToken = JWT.decode(token);
        if (!decodedToken || decodedToken.exp < Moment().unix()) {
            throw new Error('INVALID_TOKEN');
        }
        return decodedToken;
    };
}
