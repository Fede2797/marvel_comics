
const { Schema, model } = require("mongoose");

const ComicSchema = Schema({
    comic_id: {
        type: String,
        required: [true, 'Must provide ID']
    },
    title: {
        type: String,
    },
    seenAt: {
        type: Date,
        default: Date.now()
    },    
});

module.exports = model( 'Comic', ComicSchema );