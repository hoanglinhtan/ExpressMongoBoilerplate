import Event from '../models/Event';

export class EventRepository {
    /**
     * Get Event
     * @param {*}  { condition, select, isLean }
     * @returns {*} Event
     */
    async getEvent({ condition, select, isLean }) {
        return await Event.findOne(condition || {}, select || {}).lean(isLean);
    }

    /**
     * Get Events
     * @param {*} { condition, select, sort, skip, limit, isLean }
     * @returns {Array} Event[]
     */
    async getEvents({ condition, select, sort, skip, limit, isLean = true }) {
        return await Promise.all([
            Event.countDocuments(condition || {}),
            Event.find(condition || {})
                .select(select || {})
                .sort(sort || {})
                .skip(skip || 0)
                .limit(limit || 10)
                .lean(isLean),
        ]);
    }

    /**
     * Create New Event
     * @param {*} { data }
     * @returns {*} Event
     */
    async create(data) {
        const event = new Event(data);
        return await event.save(data);
    }

    /**
     * Update Event
     * @param {*} { id, data }
     * @returns {*} Event
     */
    async update(id, data) {
        return await Event.findByIdAndUpdate(id, data, { new: true });
    }

    /**
     * Delete Event By Condition
     * @param {*} condition
     */
    async delete(condition) {
        return await Event.deleteOne(condition);
    }
}
