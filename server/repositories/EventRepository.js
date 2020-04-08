import Event from '../models/Event';
import { BaseRepository } from './BaseRepository';

export class EventRepository extends BaseRepository {
    constructor() {
        super(Event);
    }
}
