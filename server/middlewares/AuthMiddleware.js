import JwtHelper from '../helpers/JwtHelper';
import ResponseHelper from '../helpers/ResponseHelper';
import { HttpConfig } from '../config';
import { tokenRepository } from '../repositories';

const verifyToken = async (req, res, next) => {
    try {
        const token = req.header(HttpConfig.HEADER.TOKEN);
        if (!token) {
            throw new Error('TOKEN_NOT_FOUND_ERROR');
        } else {
            const decodeToken = JwtHelper.verifyToken(token, lang);
            const user = await tokenRepository.getUser({
                userId: decodeToken.uid,
                token,
            });
            if (!user) {
                throw new Error('USER_NOT_FOUND_ERROR');
            } else {
                return next();
            }
        }
    } catch (err) {
        return ResponseHelper.sendError(res, err);
    }
};

export default {
    verifyToken,
};
