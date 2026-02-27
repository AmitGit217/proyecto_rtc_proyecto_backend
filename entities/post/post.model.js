import mongoose from 'mongoose';


const postSchema = new mongoose.Schema({
    title: {type:String, require: true, trim: true},
    description: { type: String, require: true, trim: true },   
},{
    timestamps: true,
})

const Post = mongoose.model('posts', postSchema, 'posts');

export default Post;


