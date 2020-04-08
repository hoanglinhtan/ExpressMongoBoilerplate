import UserModel from '../models/User';
import { BaseRepository } from './BaseRepository';

export class UserRepository extends BaseRepository {
    constructor() {
        super(UserModel);
    }
}
