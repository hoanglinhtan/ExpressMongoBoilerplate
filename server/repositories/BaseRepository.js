export class BaseRepository {
    constructor(_model) {
        this.model = _model;
    }

    /**
     * Get One
     * @param {*}  { condition, select, isLean }
     * @returns {*} T
     */
    async getOne({ condition, select, isLean = true }) {
        return await this.model.findOne(condition || {}, select || {}).lean(isLean);
    }

    /**
     * Get Many
     * @param {*} { condition, select, sort, skip, limit, isLean }
     * @returns {Array} T[]
     */
    async getManyAndCount({ condition, select, sort, skip, limit, isLean = true }) {
        return await Promise.all([
            this.model.countDocuments(condition || {}),
            this.model
                .find(condition || {})
                .select(select || {})
                .sort(sort || {})
                .skip(skip || 0)
                .limit(limit || 10)
                .lean(isLean),
        ]);
    }

    /**
     * Create New
     * @param {*} { data }
     * @returns {*} T
     */
    async create(data) {
        return await this.model.create(data);
    }

    /**
     * Update One
     * @param {*} { id, data }
     * @returns {*} T
     */
    async update({ id, data }) {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    /**
     * Delete One By Condition
     * @param {*} condition
     */
    async delete({ _id }) {
        return await this.model.findByIdAndDelete(_id);
    }
}
