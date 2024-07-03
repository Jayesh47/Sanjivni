import React from "react";
import logo from '../../../static/logo.png';
import './authenticate.css';
import { Link } from "react-router-dom";

export default function BecomeSeller() {
    return (
        <section className="seller-register">
            <span className="d-flex flex-column align-items-center my-4">
                <img src={logo} alt="" width="100px" />
                <h1>Become Seller In Sanjivni</h1>
            </span>
            <form method="post" className="seller-form form w-50 m-auto">
                <input type="text" name="seller-name" className="seller-name form-control" placeholder="Your Username Here." />
                <input type="text" name="seller-email" className="seller-email form-control my-4" placeholder="Your Organizational Email Here." />
                <input type="password" name="create-pass" className="create-pass form-control" placeholder="Create Your Password Here." />
                <input type="password" name="confirm" className="confirm form-control my-4" placeholder="Confirm Your Password." />
                <span>if already have an account? <Link to="/seller-login">Login Here.</Link></span><br />
                <button type="submit" className="btn btn-primary mt-3">Register</button>
            </form>
        </section>
    )
}