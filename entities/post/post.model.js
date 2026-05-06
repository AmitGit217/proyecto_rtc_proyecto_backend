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


postSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        const User = mongoose.model('users');
        await User.findByIdAndUpdate(doc.author, {
            $pull: { posts: doc._id }
        });
    }
});
const Post = mongoose.model('posts', postSchema, 'posts');





export default Post;


