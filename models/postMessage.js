import mongoose from "mongoose"

// first we have to create a mongoose schema
// schema is a object that lets you define shape of content 
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFiles: {},
    bugStatus: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

// now that i have my schema i need to turn it into a model
const PostMessage = mongoose.model('PostMessage', postSchema)

// later on we can use this model to find create delete and update
export default PostMessage;