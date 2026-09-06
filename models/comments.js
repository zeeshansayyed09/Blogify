const { Schema, model } = require('mongoose')
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

    content: {
        type: String,
        required: true
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "blog"
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }

}, {timestamps: true})


const Comments = model("comment", commentSchema);

module.exports = Comments;