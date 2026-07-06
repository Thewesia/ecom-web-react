import { Link } from "react-router-dom";

export default function Navbar(){
    return <nav classname="navbar">
       <div classname="navbar-container">
        <Link to="/" classname="navbar-brand"> ShopHub
        </Link>
        <div classname="navbar-links">
        <Link to="/" classname="navbar-link">
        Home
        </Link>
        <Link to="/checkout"classname="navbar-link">
        Cart
        </Link>
        </div>
        <div classname="navbar-auth">
            <div classname="navbar-auth-links">
                <Link to="/auth" classname="btn btn-secondary">
                 Login
                </Link>
                <Link to="/auth"classname="btn btn-primary">
                Signup
                </Link>
            </div>
        </div>
        </div> 
    </nav>
}