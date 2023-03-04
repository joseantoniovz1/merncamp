import { useContext, useState, useEffect } from "react";
import { Avatar, Card } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import axios from "axios";
import {RollbackOutlined} from "@ant-design/icons";
import Link from "next/link";

const {Meta} = Card;

const Username = () => {
    const [state, setState] = useContext(UserContext);
    const [user, setUser] = useState([])
    
    const router = useRouter(); 

    useEffect(() => {
        if(router.query.username)
            fetchUser();
    }, [router.query.username]);

    const fetchUser = async () => {
        try {
            const {data} = await axios.get(`/user/${router.query.username}`);
            console.log("Following list: ", data);
            setPeople(data);
        } catch (err) {
            console.log(err);
        }
    };

    const imageSource = (user) =>{
        console.log(user);
        if(user.image){
            return user.image.url;
        } else {
            return "/images/avt.jpg";
        }
    };

    return (
        <div className="row col-md-6 offset-md-3">
            <div className="pt-5">
                <Card hoverable cover={<img src={imageSource()} alt={user.name} />}>
                    <Meta 
                        title={user.name} 
                        description={user.about} 
                    />
                    <a className="pt-2 text-muted">
                        joined {moment(user.createdAt).fromNow()}
                    </a>
                    <div className="d-flex justify-content-between">
                        <span className="btn btn-sm">
                            {user.followers && user.followers.length} Followers
                        </span>
                        <span className="btn btn-sm">
                            {user.following && user.following.length} Following
                        </span>
                    </div>
                </Card>
                
                <Link legacyBehavior href="/user/dashboard">
                    <a className="d-flex justify-content-center pt-5">
                        <RollbackOutlined />
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default Username;