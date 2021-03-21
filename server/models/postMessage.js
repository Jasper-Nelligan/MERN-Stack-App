import mongoose from 'mongoose';

// Create a mongoose schema
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

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;