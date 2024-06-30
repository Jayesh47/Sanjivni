import React from "react";
import logo from '../../static/logo.png';
import { Link } from "react-router-dom";

export default function Header() {
    var auth = localStorage.getItem('Auth');
    if (auth === "" | auth === undefined | auth === null) auth = false;
    return (
        <nav className="navbar align-items-center">
            <div className="logo">
                <img src={logo} alt="" width="100px" />
            </div>
            <ul className="nav-menu mt-3">
                <li className="nav-links"><Link to="/" className="active">Home</Link></li>
                <li className="nav-links"><Link to="/Store">Store</Link></li>
                <li className="nav-links"><Link to="/about">About</Link></li>
                {
                    auth && (
                        <span className="d-flex">
                        <li className="nav-links"><Link to="/login">Profile</Link></li>
                        <li className="nav-links"><Link to="/logout">Logout</Link></li></span>
                    )
                }
                {
                    !auth && (<li className="nav-links"><Link to="/login">Login</Link></li>)
                }
            </ul>
        </nav>
    )
}