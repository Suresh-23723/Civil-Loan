const mongoose = require('mongoose');

const servSchema = new mongoose.Schema(
    {
        type: {
            type: String,
        },
        code: {
            type: String,
        },
        description: {
            type: String,
        },
        loanMin: {
            type: Number,
        },
        loanMax: {
            type: Number,
        },
        rateOfEMI: {
            type: Number,
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        }
    }
);

const servModel = mongoose.model('services',servSchema);

module.exports = servModel;


 