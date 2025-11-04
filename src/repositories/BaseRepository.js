class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async findAll(filter = {}, options = {}) {
        const { sort, limit, skip, populate, select } = options;

        let query = this.model.find(filter);

        if (select) query = query.select(select);
        if (sort) query = query.sort(sort);
        if (limit) query = query.limit(limit);
        if (skip) query = query.skip(skip);
        if (populate) query = query.populate(populate);

        return await query.exce()
    }


    async findById(id, options = {}) {
        const { populate, select } = options;

        let query = this.model.findById(id);

        if (select) query = query.select(select);
        if (populate) query = query.populate(populate);

        return await query.exec();
    }

    async findOne(filters, options = {}) {
        const { populate, select } = options;

        let query = this.model.findOne(filters);

        if (select) query = query.select(select);
        if (populate) query = query.populate(populate);

        return await query.exec();
    }

    async create(data) {
        const document = new this.model(data);
        return await document.save();
    }

    async updateById(id, updateData, options = {}) {
        const defaultOptions = {
            new: true,
            runValidators: true,
            ...options
        };

        return await this.model.findByIdAndUpdate(
            id,
            { ...updateData, updatedAt: new Date() },
            defaultOptions
        );
    }

    async deleteById(id) {
        return await this.model.findByIdAndDelete(id);
    }

    async count(filters = {}) {
        return await this.model.countDocuments(filters);
    }
}

module.exports = BaseRepository;
