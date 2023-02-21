import Link from "next/link";
import Home from "../pages";

const Nav = () => {
  return (
    <nav className="nav d-flex justify-content-between" style={{backgroundColor:"blue"}}>
      
        <Link legacyBehavior href="/">
          <a className="nav-link text-light logo">MERNCAMP</a>
        </Link>
        
        <Link legacyBehavior href="/login">
          <a className="nav-link text-light">Login</a>
        </Link>

        <Link legacyBehavior href="/register">
          <a className="nav-link text-light">Register</a>
        </Link>
      
    </nav>
  );
};

export default Nav;
