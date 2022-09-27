const mongoose = require('mongoose')
const { Schema, model } = require('mongoose');
const { ObjectId } = Schema

const CommentSchema = new Schema({
    image_id: { type: Schema.Types.ObjectId },
    name: { type: String },
    gravatar: { type: String },
    email: { type: String },
    comment: { type: String },
    timestamp: { type: Date, default: Date.now },
},
    {
        versionKey: false,
    }    
);

module.exports = mongoose.model('Comment', CommentSchema);
