import mongoose from 'mongoose';


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


postSchema.pre('findOneAndDelete', async function(deletedPost) {
    if (deletedPost) {
        const User = mongoose.model('users'); 
        await User.findByIdAndUpdate(deletedPost.author, {
            $pull: { posts: deletedPost._id }
        });
    }
});

const Post = mongoose.model('posts', postSchema, 'posts');





export default Post;


