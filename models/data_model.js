const mongoose = require('mongoose');
const { Schema } = mongoose;

const dataSchema = new Schema({
    date: {
        month: {
            type: String,
            enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            required: true,
            default: 'January'
        },
        year: {
            type: Number,
            required: true,
            min: 1900,
            default: 2025
        }
    },
    earnings: {
        category: {
            type: [String],
            required: true
        },
        amount: {
            type: Number,
            required: true,
            min: 0
        },
        categoryAmounts: {
            type: Map,
            of: Number,
            default: {}
        }
    },
    expenses: {
        category: {
            type: [String],
            required: true
        },
        amount: {
            type: Number,
            required: true,
            min: 0
        },
        categoryAmounts: {
            type: Map,
            of: Number,
            default: {}
        }
    },
    notes: {
        type: String,
        maxlength: 500
    }
});

const data = mongoose.model('Data', dataSchema);
module.exports = data;