const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "Post must have title"]
    },
    body: {
        type: String,
        require: [true, "Post must have body"]
    },
    createdBy: {
        type: String
    },
    updatedBy: {
        type: String
    }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;