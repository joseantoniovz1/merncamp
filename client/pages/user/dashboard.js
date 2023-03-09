import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import PostForm from "../../components/forms/PostForm";
import { useRouter } from "next/router";
import axios from "axios";
import {toast} from "react-toastify";
import PostList from "../../components/cards/PostList";
import People from "../../components/cards/People";
import Link from "next/link";
import {Modal, Pagination} from "antd";
import CommentForm from "../../components/forms/CommentForm";
import Search from "../../components/Search";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKEIO, {
    reconnection: true
});

const Home = () => {
    const [state, setState] = useContext(UserContext);
    //state
    const [content, setContent] = useState("");
    const [image, setImage] = useState({});
    const [uploading, setUploading] = useState(false);
    //posts
    const [posts, setPosts] = useState([]);
    // people
    const [people, setPeople] = useState([]);
    // comments
    const [comment, setComment] = useState("");
    const [visible, setVisible] = useState(false);
    const [currentPost, setCurrentPost] = useState({});
    // pagination
    const [totalPost, setTotalPost] = useState(0);
    const [page, setPage] = useState(1);

    //router
    const router = useRouter();

    //useEffect
    useEffect(() =>{
        if(state && state.token){
            newsFeed();
            findPeople();
        }
    }, [state && state.token, page]);

    useEffect(()=> {
        try {
            axios.get("/total-posts").then(({data}) => setTotalPost(data));
        } catch (err) {
            console.log(err);
        }
    }, [])

    const newsFeed = async ()=> {
        try{
            const {data} = await axios.get(`/news-feed/${page}`);
            //console.log("User posts: ", data);
            setPosts(data);
        }catch(err){
            console.log(err);
        }
    }

    const findPeople = async () => {
        try {
            const {data} = await axios.get("/find-people");
            setPeople(data);
        } catch (err) {
            console.log(err);
        }
    }

    const postSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post("/create-post", {
                content, image
            });
            console.log("create post response: ", data);
            if(data.error){
                toast.error(data.error);
            } else {
                setPage(1);
                newsFeed();
                toast.success("Post created");
                setContent("");
                setImage({});
                // socket
                socket.emit("new-post", data);
            }
        }catch(err){
            console.log(err);
        }
    }

    const handleImage = async (e)=> {
        const file = e.target.files[0];
        let formData = new FormData();
        formData.append("image", file);
        //console.log([...formData]);
        setUploading(true);
        try {
            const {data} = await axios.post("/upload-image", formData);
            //console.log("Uploaded image: ", data);
            setImage({
                url: data.url,
                public_id: data.public_id
            });
            setUploading(false);
        }catch(err){
            console.log(err);
            setUploading(false);
        }
    };

    const handleDelete = async (post) => {
        try {
            const answer = window.confirm("¿Are you sure?")
            if(!answer)
                return;
            const {data} = await axios.delete(`/delete-post/${post._id}`);
            toast.error("Post deleted");
            newsFeed();
        } catch (err) {
            console.log(err);
        }
    };

    const handleFollow = async (user)=> {
        //console.log("add this user to following list: ", user);
        try {
            const {data} = await axios.put("/user-follow", {_id:user._id});
            //console.log("handle follow response: ", data);
            // update local storage, update user, keep token
            let auth = JSON.parse(localStorage.getItem("auth"));
            auth.user = data;
            localStorage.setItem("auth", JSON.stringify(auth));
            // update context
            setState({...state, user: data});
            // update people state
            let filtered = people.filter((p)=>p._id !== user._id);
            setPeople(filtered);
            // rerender the post in newsfeed
            newsFeed();
            toast.success(`Following ${user.name}`);
        } catch (err) {
            console.log(err);
        }
    };

    const handleLike = async (_id) => {
        try {
            const {data} = axios.put("/like-post", {_id});
            newsFeed();
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnlike = async (_id) => {
        try {
            const {data} = axios.put("/unlike-post", {_id});
            newsFeed();
        } catch (err) {
            console.log(err);
        }
    };

    const handleComment = (post) => {
        setCurrentPost(post);
        setVisible(true);

    };

    const addComment = async (e)=> {
       e.preventDefault();
        try {
            const {data} = await axios.put("/add-comment", {
                postId: currentPost._id,
                comment
            });
            console.log("Add comment: ", data);
            setComment("");
            setVisible(false);
            newsFeed();
        } catch (err) {
        console.log(err);
        }
    };

    const removeComment = async (postId, comment) => {
        let answer = window.confirm("¿Are you sure?");
        if(!answer)
            return;
        try {
            //console.log("Deleting comment from: ", postId, " and ", comment);    
            const {data} = await axios.put("/remove-comment", {postId, comment});
            console.log("Comment removed: ", data);
            newsFeed();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <UserRoute>
            <div className="container-fluid">
                <div className="row py-5 bg-default-image text-light">
                    <div className="col text-center">
                        <h1>Newsfeed</h1>
                    </div>
                </div>
                <div className="row py-3">
                    <div className="col-md-8">
                        <PostForm
                            content = {content}
                            setContent = {setContent}
                            postSubmit = {postSubmit}
                            handleImage = {handleImage}
                            uploading = {uploading}
                            image = {image}
                        />
                        <br/>
                        <PostList 
                            posts={posts} 
                            handleDelete={handleDelete} 
                            handleLike={handleLike} 
                            handleUnlike={handleUnlike}
                            handleComment={handleComment}
                            removeComment={removeComment}
                        />

                        <Pagination 
                            className="pb-5" 
                            current={page} 
                            total={(totalPost/3)*10} 
                            onChange={value => setPage(value)}
                        />

                    </div>

                    { /*<pre>{JSON.stringify(posts, null, 4)}</pre>*/}
                    
                    <div className="col-md-4">
                        <Search />
                        <br/>
                        {state && state.user && state.user.following && <Link legacyBehavior href={`/user/following`}>
                                <a className="h6">{state.user.following.length} Following</a>
                            </Link>}
                        <People people={people} handleFollow={handleFollow}/>
                    </div>
                </div>
                <Modal open={visible} onCancel={()=> setVisible(false)} title="Comment" footer={null}>
                    <CommentForm 
                        addComment={addComment} 
                        comment={comment} 
                        setComment={setComment}
                    />
                </Modal>
            </div>
        </UserRoute>
    );
};

export default Home;