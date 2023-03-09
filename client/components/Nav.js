import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import { useRouter } from "next/router";
import { Avatar } from "antd";

const Nav = () => {

  const [current, setCurrent] = useState("");
  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  console.log("current: ", current);

  const router = useRouter();

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  }

  return (
    <nav className="nav d-flex justify-content-between" style={{backgroundColor:"blue"}}>
      
        <Link legacyBehavior href="/">
          <a className={`nav-link text-light logo ${current==="/" && "active"}`}>
            <Avatar src="/images/logo.png"/> MERNCAMP
          </a>
        </Link>

        { state !== null ? (
          <div>
            <div className="dropdown">
              <a 
                className="btn dropdown-toggle text-light" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                {state && state.user && state.user.name}
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link legacyBehavior href="/user/dashboard">
                    <a className={`nav-link dropdown-item ${current === "/user/dashboard" && "active"}`}>Dashboard</a>
                  </Link>
                </li>
                <li>
                  <Link legacyBehavior href="/user/profile/update">
                    <a className={`nav-link dropdown-item ${current === "/user/profile/update" && "active"}`}>Profile</a>
                  </Link>
                </li>
                <li>
                  <a className="nav-link dropdown-item" onClick={logout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        ): (
          <div>
          <Link legacyBehavior href="/login">
            <a className={`nav-link text-light ${current === "/login" && "active"}`}>Login</a>
          </Link>

          <Link legacyBehavior href="/register">
            <a className={`nav-link text-light ${current === "/register" && "active"}`}>Register</a>
          </Link>
        </div>
        )}

    </nav>
  );
};

export default Nav;
