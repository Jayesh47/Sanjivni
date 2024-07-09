import React, { useEffect, useState } from "react";
import logo from '../../static/logo.png';
import { Link } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

export default function Header() {
    var auth = localStorage.getItem('loginStatus');
    const [links, setLinks] = useState({ link1: "", link2: "", link3: "", link4: "", link5: "" });
    const [Names, setNames] = useState({ opt1: "", opt2: "", opt3: "", opt4: "", opt5: "" });
    if (auth === "" | auth === undefined | auth === null) auth = false;
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const role = jwtDecode(token)["roles"];
            if (role === "buyer") {
                setLinks({
                    link1: "/user-profile",
                    link2: "/credit-points",
                    link3: "/track-order",
                    link4: "/purchase-history",
                    link5: "/forgot-password"
                });
                setNames({
                    opt1: "User Profile",
                    opt2: "Credit Points",
                    opt3: "Track Orders",
                    opt4: "Purchase History",
                    opt5: "Forgot Password"
                });
            }
            if (role === "seller") {
                setLinks({
                    link1: "/seller-profile",
                    link2: "/add-new-item",
                    link3: "/selling-products",
                    link4: "/view-all",
                    link5: "/total-earnings"
                })
                setNames({
                    opt1: "Seller Profile",
                    opt2: "Add New",
                    opt3: "Selling Products",
                    opt4: "View All",
                    opt5: "Total Earnings"
                })
            }
        }
    }, []);

    return (
        <nav className="navbar">
            <div className="logo d-flex justify-content-around align-items-center w-100">
                <div className="nav-logo p-2 text-center">
                    <img src={logo} alt="" width="130px" />
                </div>
                <div className="search w-50 d-flex justify-content-end">
                    <input type="search" name="search" className="w-75 p-3" placeholder="What are you looking for?" />
                    <button className="btn"><i className="fas fa-search"></i></button>
                </div>
                <div className="social-icons">
                    <a href="/"><i className="fab fa-facebook"></i></a>
                    <a href="/"><i className="fab fa-instagram"></i></a>
                    <a href="/"><i className="fab fa-whatsapp"></i></a>
                    <a href="/"><i className="fab fa-github"></i></a>
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
                        <span className="d-flex align-items-center">
                            <li className="nav-links dropdown">
                                <Link className="nav-link dropdown-toggle" to={links.link1} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa fa-user"></i> {Names.opt1}
                                </Link>
                                <ul className="dropdown-menu bg-dark">
                                    <li className="dropdown-links"><Link to={links.link1} className="dropdown-item text-light">{Names.opt1}</Link></li>
                                    <li className="dropdown-links"><Link to={links.link2} className="dropdown-item text-light">{Names.opt2}</Link></li>
                                    <li className="dropdown-links"><Link to={links.link3} className="dropdown-item text-light">{Names.opt3}</Link></li>
                                    <li className="dropdown-links"><Link to={links.link4} className="dropdown-item text-light">{Names.opt4}</Link></li>
                                    <li className="dropdown-links"><Link to={links.link5} className="dropdown-item text-light">{Names.opt5}</Link></li>
                                </ul>
                            </li>
                            <li className="nav-links"><Link to="/logout"><i className="fa fa-sign-out-alt"></i> Logout</Link></li>
                        </span>
                    )
                }
                {
                    !auth && (<span className="d-flex">
                        <li className="nav-links"><Link to="/login"><i className="fa fa-sign-in-alt"></i> Login</Link></li>
                        <li className="nav-links"><Link to="/become-seller"><i className="fa fa-users"></i> Become a Seller</Link></li>
                    </span>
                    )
                }
            </ul>
        </nav>
    )
}