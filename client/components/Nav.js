import Link from "next/link";
import Home from "../pages";

const Nav = () => {
  return (
    <nav className="nav bg-dark d-flex justify-content-between">
      
        <Link legacyBehavior href="/">
          <a className="nav-link text-light">Home</a>
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
