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
            const { username, password } = req.body;
            const existedUser = await userRepository.getUser({ username });
            if (existedUser) {
                throw Error('EMAIL_EXISTED_ERROR');
            }
            const user = await userRepository.create({
                username,
                password,
            });
            delete user.password;
            return ResponseHelper.sendSuccess(res, user);
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

            await tokenRepository.create({
                userId: user.id,
                username: user.username,
                accessToken,
                expireAt: Moment().add(authConfig.accessTokenLifetime),
            });

            return ResponseHelper.sendSuccess(res, { accessToken, ...user });
        } catch (e) {
            return ResponseHelper.sendError(res, e);
        }
    };

    /**
     * Login
     * @param {*} { username, password }
     * @returns {*} { id, username, accessToken }
     */
    logout = async ({ userId, accessToken }, res) => {
        try {
            await tokenRepository.deleteToken({ userId, accessToken });
            return ResponseHelper.sendSuccess(res, true);
        } catch (e) {
            return ResponseHelper.sendError(res, e);
        }
    };
}
