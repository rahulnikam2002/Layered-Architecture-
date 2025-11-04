const mongoose = require("mongoose")

const toolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tool name is required'],
        trim: true,
        maxlength: [100, 'Tool name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Tool description is required'],
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    category: {
        type: String,
        required: [true, 'Tool category is required'],
        enum: {
            values: ['IDE', 'API_TOOL', 'VERSION_CONTROL', 'DATABASE', 'DESIGN', 'PRODUCTIVITY', 'OTHER'],
            message: 'Invalid category'
        }
    },
    url: {
        type: String,
        required: [true, 'Tool URL is required'],
        validate: {
            validator: function (url) {
                return /^https?:\/\/.+/.test(url);
            },
            message: 'Please provide a valid URL'
        }
    },
    isPopular: {
        type: Boolean,
        default: false
    },
    tags: [{
        type: String,
        trim: true
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    versionKey: false
});

toolSchema.index({ category: 1, isPopular: -1 })
toolSchema.index({ name: 1 })

toolSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next()
})


toolSchema.statics.findPopular = function () {
    return this.find({ isPopular: true }).sort({ createdAt: -1 })
}

toolSchema.statics.findByCategory = function (category) {
    return this.find({ category }).sort({ name: 1 })
}


const Tool = mongoose.model("Tool", toolSchema)

module.exports = Tool