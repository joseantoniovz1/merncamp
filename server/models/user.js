import mongoose from "mongoose";

const {Scheme} = mongoose;

const userSchema = new Scheme({
    name: {
        type: String, 
        trim: true,
        required: true
    },
    email: {
        type: String, 
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min:6,
        max:64
    },
    secret: {
        type: String, 
        required: true
    },
    about: {},
    photo: String,
    following: [{type: Scheme.ObjectId, ref:"User"}],
    followers: [{type: Scheme.ObjectId, ref:"User"}]
}, {timestamps: true});

export default mongoose.model("User", userSchema);