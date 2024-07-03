import React from "react";
import icon from '../../static/tree1.jpg';
import './admin.css';
import { Link } from "react-router-dom";

export default function SellerProfile() {
    return (
        <section className="seller-profile">
            <h1 className="text-center my-4">Seller Dashboard</h1>
            <div className="d-flex w-75 m-auto">
                <img src={icon} alt="" width={"200px"} height="200px" className="seller-icon" />
                <form method="post" className="form w-75 ms-5">
                    <input type="text" name="profile-name" className="profile-name form-control border-primary" placeholder="Profile Name: Jayesh Malviya" />
                    <input type="text" name="profile-email" className="profile-email form-control my-4 border-primary" placeholder="Profile Email: Jayesh@gmail.com" />
                    <input type="text" name="seller-street" className="seller-street form-control border-primary" placeholder="Seller Street Address" />
                    <input type="text" name="seller-city" className="seller-city form-control my-4 border-primary" placeholder="Seller City: Udaipur" />
                    <input type="text" name="seller-state" className="seller-state form-control border-primary" placeholder="Seller State: Rajasthan" />
                    <input type="text" name="seller-landmark" className="seller-landmark form-control my-4 border-primary" placeholder="Seller Landmark: Near City Palace" />
                    <input type="number" name="seller-pincode" className="seller-pincode form-control border-primary" placeholder="Seller Pincode: 313001" />
                    <input type="text" name="seller-phone" className="seller-phone form-control border-primary my-4" placeholder="Seller Phone Number: 880232**293" />
                    <button type="submit" className="btn btn-primary fw-bold">Update Details</button>
                    <span className="ms-3"><Link to="/forgot-password" className="btn btn-success fw-bold">Forgot Password</Link></span>
                </form>
            </div>
        </section>
    )
}