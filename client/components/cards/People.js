import { useContext } from "react";
import { Avatar, List } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import UserRoute from "../routes/UserRoute";

const People = ({people, handleFollow}) => {
    const [state] = useContext(UserContext);
    
    const router = useRouter(); 

    const imageSource = (user) =>{
        console.log(user);
        if(user.image){
            return user.image.url;
        } else {
            return "/images/avt.jpg";
        }
    };
    
    return (
        <>
            <List itemLayout="horizontal" dataSource={people} renderItem={(user)=> (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src={imageSource(user)}/>}
                        title={
                        <div className="d-flex justify-content-between">
                            { user.username} <span onClick={()=>handleFollow(user)} className="text-primary pointer">Follow</span>
                        </div>}>
                        
                    </List.Item.Meta>
                </List.Item>
            )}/>
        </>
    );
};

export default People;