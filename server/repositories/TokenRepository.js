import TokenModel from '../models/Token';
import { BaseRepository } from './BaseRepository';

export class TokenRepository extends BaseRepository {
    constructor() {
        super(TokenModel);
    }
}
