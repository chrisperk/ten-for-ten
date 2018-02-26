import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    score: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Score', scoreSchema);