import { Avatar } from "antd";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill", {ssr: false}));
//import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePostForm = ({content, setContent, postSubmit}) =>{



    return (
        <div className="card">
            <div className="card-body pb-3">
                <form className="forn-group">
                    <ReactQuill
                        theme="snow"
                        className="form-control" 
                        placeholder="Write Something" 
                        value={content} 
                        onChange={(e) => setContent(e)}
                    >
                    </ReactQuill>
                </form>
                <div className="card-footer">
                    <button disabled={!content} className="btn btn-primary btn-sm mt-1" onClick={postSubmit}>
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePostForm;