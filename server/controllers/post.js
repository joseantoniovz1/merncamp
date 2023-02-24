import Post from "../models/post";
import cloudinary from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

export const createPost = async (req, res)=> {
    //console.log("post: ", req.body);

    const { content, image } = req.body;
    if(!content.length) {
        return res.json({
            error: "Content is required"
        });
    }

    try {
        const post = new Post({content, image, postedBy: req.auth._id});
        post.save();
        res.json(post);
    }catch(err){
        console.log(err);
        res.sendStatus(400);
    }
};

export const uploadImage = async (req, res) => {
    //console.log("req files: ", req.files);
    try {
        const result = await cloudinary.uploader.upload(req.files.image.path);
        console.log("Uploaded image ur: ", result);
        res.json({
            url: result.secure_url, //https
            public_id: result.public_id 
        });
    }catch(err){
        console.log(err);
    }
};