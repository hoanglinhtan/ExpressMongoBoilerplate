import UserModel from '../models/User';

export class UserRepository {
    /**
     * Create User
     * @param {User} { username, password }
     * @returns {User} { _id, username, password }
     */
    async create(data) {
        return await UserModel.create(data);
    }

    /**
     * Get User By Condition
     * @param {*} { condition, isLean }
     * @returns {User} { _id, username, password }
     */
    async getUser(condition, isLean = true) {
        return await UserModel.findOne(condition).lean(isLean);
    }
}
