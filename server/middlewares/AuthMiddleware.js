import JwtHelper from '../helpers/JwtHelper';
import ResponseHelper from '../helpers/ResponseHelper';
import { tokenRepository } from '../repositories';

const verifyToken = async (req, res, next) => {
    try {
        const accessToken = JwtHelper.getToken(req);
        if (!accessToken) {
            throw new Error('TOKEN_NOT_FOUND_ERROR');
        } else {
            const decodeToken = JwtHelper.verifyToken(accessToken);
            const savedToken = await tokenRepository.getOne({
                condition: {
                    userId: decodeToken.uid,
                    accessToken,
                },
            });
            if (!savedToken) {
                throw new Error('USER_NOT_FOUND_ERROR');
            } else {
                req.userId = decodeToken.uid;
                req.accessToken = accessToken;
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
