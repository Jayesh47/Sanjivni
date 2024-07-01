import React from "react";
import logo from '../../static/logo.png';
import { Link } from "react-router-dom";

export default function Header() {
    var auth = localStorage.getItem('Auth');
    if (auth === "" | auth === undefined | auth === null) auth = false;
    return (
        <nav className="navbar ">
            <div className="logo d-flex justify-content-around align-items-center w-100">
                <div className="social-icons w-50">
                    <span><i className="fab fa-facebook"></i></span>
                    <span><i className="fab fa-instagram"></i></span>
                    <span><i className="fab fa-whatsapp"></i></span>
                    <span><i className="fab fa-github"></i></span>
                </div>
                <div className="nav-logo  w-50 text-center">
                    <img src={logo} alt="" width="90px" />
                </div>
                <div className="search w-50 d-flex justify-content-end">
                    <input type="search" name="search" className="form-control w-75" placeholder="Search Your Favorite Plant" />
                    <button className="btn"><i className="fa fa-search"></i></button>
                </div>
            </div>
            <ul className="nav-menu d-flex justify-content-center align-items-center w-100">
                <li className="nav-links"><Link to="/"><i className="fa fa-home"></i> Home</Link></li>
                <li className="nav-links"><Link to="/Store"><i className="fa fa-store"></i> Store</Link></li>
                <li className="nav-links"><Link to="/cart"><i className="fa fa-shopping-cart"></i> Cart</Link></li>
                <li className="nav-links"><Link to="/wishlist"><i className="fa fa-heart"></i> Wishlist</Link></li>
                <li className="nav-links"><Link to="/about"><i className="fa fa-address-card"></i> About us</Link></li>
                {
                    auth && (
                        <span className="d-flex">
                            <li className="nav-links dropdown">
                                <Link className="nav-link dropdown-toggle" to="/user-profile" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa fa-user"></i> Profile
                                </Link>
                                <ul className="dropdown-menu bg-dark">
                                    <li className="dropdown-links"><Link to='/user-profile' className="dropdown-item text-light">user profile</Link></li>
                                    <li className="dropdown-links"><Link to='/credit-points' className="dropdown-item text-light">Credit Points</Link></li>
                                    <li className="dropdown-links"><Link to='/track-order' className="dropdown-item text-light">Track Order</Link></li>
                                    <li className="dropdown-links"><Link to='/purchase-history' className="dropdown-item text-light">Purchase History</Link></li>
                                    <li className="dropdown-links"><Link to='/forgot-password' className="dropdown-item text-light">Forgot Password</Link></li>
                                </ul>
                            </li>
                            <li className="nav-links"><Link to="/logout"><i className="fa fa-sign-out-alt"></i> Logout</Link></li>
                        </span>
                    )
                }
                {
                    !auth && (<li className="nav-links"><Link to="/login"><i className="fa fa-sign-in-alt"></i> Login</Link></li>)
                }
            </ul>
        </nav>
    )
}