import { useState, useContext } from "react";
import axios from 'axios';
import {toast} from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";
import { UserContext } from "../context";
import { useRouter } from "next/router";

const ForgotPassword = () => {

    const [email, setEmail]= useState('');
    const [newPassword, setNewPassword]= useState('');
    const [secret, setSecret]= useState('');
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(false);

    const [state, setState] = useContext(UserContext);
    const router = useRouter();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
        //console.log(name, email, password, secret);
            const {data} = await axios.post(`/forgot-password`, {
                email,
                newPassword,
                secret
            });
            console.log("forgot password res data: ", data);
            setEmail("");
            setNewPassword("");
            setSecret("");
            setOk(data.ok);
            setLoading(false);
            //.then((res)=>setOk(res.data.ok))
        } catch(err){
            console.log("ALV" + err);
            toast.error(err.response.data);
            setLoading(false);
        }
    };

    if(state && state.token)
        router.push("/");
    

    return (
        <div className="container-fluid">
            <div className="row py-5 bg-default-image text-light">
                <div className="col text-center">
                    <h1>Forgot Password</h1>
                </div>
            </div>

            <div className="row py-5">
                <div className="col-md-6 offset-md-3">
                    <ForgotPasswordForm  
                        handleSubmit={handleSubmit}
                        email={email}
                        setEmail={setEmail}
                        newPassword={newPassword}
                        setNewPassword={setNewPassword}
                        secret={secret}
                        setSecret={setSecret}
                        loading={loading}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Modal 
                        title="Congratulations!"
                        open={ok}
                        onCancel={()=>setOk(false)}
                        footer={null}
                    >
                        <p>Congrats! You can conw login with your new password.</p>
                        <Link legacyBehavior href="/login">
                            <a className="btn btp-primary btn-sm">Login</a>
                        </Link>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;