import Superman from 'lodash';
import Moment from 'moment';
import JwtHelper from '../helpers/JwtHelper';
import ResponseHelper from '../helpers/ResponseHelper';
import { userRepository, tokenRepository } from '../repositories';
import { authConfig } from '../config';

export default class AuthController {
    /**
     * Register
     * @param {*} { username, password }
     * @returns {*} User
     */
    register = async (req, res) => {
        try {
            const { email, username, password } = req.body;
            const checkUser = await userRepository.getUser({ condition: { email } });
            if (checkUser) {
                throw Error('EMAIL_EXISTED_ERROR');
            }
            const user = await userRepository.create({
                email,
                username,
                password,
            });
            return ResponseHelper.sendSuccess(res, Superman.omit(user, ['password']));
        } catch (e) {
            return ResponseHelper.sendError(res, e);
        }
    };

    /**
     * Login
     * @param {*} { username, password }
     * @returns {*} { id, username, accessToken }
     */
    login = async ({ body }, res) => {
        try {
            const { username, password } = body;

            const user = await JwtHelper.authenticate({ username, password });

            const accessToken = JwtHelper.generateToken(user, authConfig.accessTokenLifetime);

            await tokenRepository.save({
                userId: user.id,
                username: user.username,
                accessToken,
                expireAt: Moment().add(authConfig.accessTokenLifetime),
            });

            return ResponseHelper.sendSuccess(res, { ...user, accessToken });
        } catch (e) {
            return ResponseHelper.sendError(res, e);
        }
    };
}
