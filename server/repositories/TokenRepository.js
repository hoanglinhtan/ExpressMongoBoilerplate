import TokenModel from '../models/Token';

export class TokenRepository {
    /**
     * Create Access Token
     * @param {Token} { userId, token }
     * @return {Token} { userId, token }
     */
    async create(data) {
        return await TokenModel.create(data);
    }

    /**
     * Get Token
     * @param {*} { condition, isLean }
     * @return {Token} { token, userId }
     */
    async getToken(condition, isLean = true) {
        return await TokenModel.findOne(condition).lean(isLean);
    }

    /**
     * Delete Token
     * @param {*} { condition }
     * @return {Boolean}
     */
    async deleteToken(condition) {
        return await TokenModel.deleteOne(condition);
    }
}
