import { useState, useContext } from "react";
import axios from 'axios';
import {toast} from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import AuthForm from "../components/forms/AuthForm";
import { PieChartFilled, ReadOutlined } from "@ant-design/icons";
import {useRouter} from "next/router";
import { UserContext } from "../context";

const Login = () => {

    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [loading, setLoading] = useState(false);

    const [state, setState] = useContext(UserContext);

    const router = useRouter();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
        //console.log(name, email, password, secret);
            const {data} = await axios.post(`/login`, {
                email,
                password
            });
            //console.log("QWE", data);
            if(data.error) {
                toast.error(data.error);
                setLoading(false);
            } else {
                // update context
                setState({
                    user: data.user,
                    token: data.token
                });
                // save in local storage
                window.localStorage.setItem("auth", JSON.stringify(data));
                router.push("/user/dashboard");
            }
        } catch(err){
            toast.error(err.response.data);
            setLoading(false);
        }
    };
    
    if(state && state.token)
        router.push("/user/dashboard");

    return (
        <div className="container-fluid">
            <div className="row py-5 bg-default-image text-light">
                <div className="col text-center">
                    <h1>Login</h1>
                </div>
            </div>

            <div className="row py-5">
                <div className="col-md-6 offset-md-3">
                    <AuthForm 
                        handleSubmit={handleSubmit}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        loading={loading}
                        page="login"
                    />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <p className="text-center">Not yet registered?{" "}
                        <Link legacyBehavior href="/register">
                            <a>Register</a>
                        </Link>
                    </p>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <p className="text-center">
                        <Link legacyBehavior href="/forgot-password">
                            <a className="text-danger">Forgot password?</a>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;