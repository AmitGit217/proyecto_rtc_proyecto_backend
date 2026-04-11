import mongoose from 'mongoose';
import User from '../user/user.model.js';      


const postSchema = new mongoose.Schema({
    title: {type:String, required: true, trim: true, unique: true},
    description: { type: String, required: true, trim: true },   
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", 
        required: true,
    },
},{
    timestamps: true,
})

const Post = mongoose.model('posts', postSchema, 'posts');

postSchema.pre('findOneAndDelete', async function(deletedPost) {
    if (deletedPost) {
        const User = mongoose.model('users'); 
        await User.findByIdAndUpdate(deletedPost.author, {
            $pull: { posts: deletedPost._id }
        });
    }
});



export default Post;


