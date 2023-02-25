import {SyncOutlined} from "@ant-design/icons"

const AuthForm = ({
    profileUpdate,
    handleSubmit,
    name, 
    setName, 
    email, 
    setEmail, 
    password, 
    setPassword, 
    secret, 
    setSecret, 
    loading, 
    page,
    username, 
    setUsername, 
    about, 
    setAbout
}) => (
    <form onSubmit={handleSubmit}>
        {profileUpdate && (<div className="form-group p-2">
            <small><label className="text-muted">Username</label></small>
            <input 
                type="text" 
                className="form-control" 
                placeholder="Enter username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
            />
        </div>)}
        {profileUpdate && (<div className="form-group p-2">
            <small><label className="text-muted">About</label></small>
            <input 
                type="text" 
                className="form-control" 
                placeholder="Write about yourself..."
                value={about}
                onChange={(e)=>setAbout(e.target.value)}
            />
        </div>)}

        {page!=="login" && (<div className="form-group p-2">
            <small><label className="text-muted">Your name</label></small>
            <input 
                type="text" 
                className="form-control" 
                placeholder="Enter name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />
        </div>)}
        <div className="form-group p-2">
            <small><label className="text-muted">Email address</label></small>
            <input 
                type="email" 
                className="form-control" 
                placeholder="Email addres"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                disabled={profileUpdate}
            />
        </div>
        <div className="form-group p-2">
            <small><label className="text-muted">Password</label></small>
            <input 
                type="password" 
                className="form-control" 
                placeholder="Enter password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
        </div>
        {page!=="login" && (
            <>
        <div className="form-group p-2">
            <small>
                <label className="text-muted">Pick a question</label>
            </small>
            <select className="form-control">
                <option>What is your favourite color?</option>
                <option>What is your best friend name?</option>
                <option>What vity you were born?</option>
            </select>

            <small className="form-text text-muted">
                You can use this to reset your password if forgotten.
            </small>
        </div>
        <div className="form-group p-2">
            <input 
                type="text" 
                className="form-control" 
                placeholder="Write your answer here"
                value={secret}
                onChange={(e)=>setSecret(e.target.value)}
            />
        </div></>)}

        <div className="form-group p-2">
            <button 
                disabled={
                    profileUpdate ? loading : 
                     page === "login" ? 
                     !email || !password || loading: 
                     !name || !email || !password || !secret || loading
                } 
                className="btn btn-primary col-12"
            >
                {loading ? <SyncOutlined spin className="py-1"/> : "Submit"}
            </button>
        </div>    
    </form>
)

export default AuthForm;