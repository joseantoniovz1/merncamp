import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import { useRouter } from "next/router";

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
          <a className={`nav-link text-light logo ${current==="/" && "active"}`}>MERNCAMP</a>
        </Link>

        { state !== null ? (
          <>
            <Link legacyBehavior href="/user/dashboard">
              <a className={`nav-link text-light ${current === "/user/dashboard" && "active"}`}>{state && state.user && state.user.name}</a>
            </Link>

            <a className="nav-link text-light" onClick={logout}>Logout</a>
          </>
        ): (
          <>
          <Link legacyBehavior href="/login">
            <a className={`nav-link text-light ${current === "/login" && "active"}`}>Login</a>
          </Link>

          <Link legacyBehavior href="/register">
            <a className={`nav-link text-light ${current === "/register" && "active"}`}>Register</a>
          </Link>
        </>
        )}

    </nav>
  );
};

export default Nav;
