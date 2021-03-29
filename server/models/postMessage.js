import mongoose from 'mongoose';

// Create a database schema
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    // tags is an array of Strings
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

// After a schema has been created, it needs to be turned into a model.
var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;