const mongoose = require('mongoose');

const memSchema = new mongoose.Schema(
    {
        mobile: {
            type: String,
            unique: true,
            required: [true, 'Required feild'],
        },
        name: {
            type: String,
            required: [true, 'Required feild'],
        },
        email: {
            type: String,
        },
        occupation: {
            type: String,
        },
        password: {
            type: String,
            required: [true, 'Required feild'],
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    }
);

const memModel = mongoose.model('members',memSchema);

module.exports = memModel;