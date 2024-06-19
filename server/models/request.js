const mongoose = require('mongoose');

const reqSchema = new mongoose.Schema(
    {
        mobile: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
        },
        amt: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        msg: {
            type: String,
        },
        code: {
            type: String,
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        }
    }
);

const reqModel = mongoose.model('requests',reqSchema);

module.exports = reqModel;