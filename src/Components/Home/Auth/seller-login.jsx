import React, { useReducer, useState } from "react";
import logo from '../../../static/logo.png';
import './authenticate.css';
import { Link } from "react-router-dom";

export default function SellerLogin() {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [Alert, setAlert] = useState({
        AlertTitle: "",
        alertMsg: "",
        show: false
    });

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({
            "name": e.target.name,
            "value": e.target.value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const check = Authenticate(formData);
        if (check.get('pswd_Verify')) {
            setAlert({
                AlertTitle: "warning",
                alertMsg: check.get("pswd_Verify"),
                show: true
            });
        } else if (check.get('EmailVerify')) {
            setAlert({
                AlertTitle: "warning",
                alertMsg: check.get('EmailVerify'),
                show: true
            });
        } else {
            setAlert({
                AlertTitle: "success",
                alertMsg: "Wait a moment please.",
                show: true
            });
            setTimeout(() => {
                localStorage.setItem('Auth', true);
                localStorage.setItem('role', "seller");
                window.location.href = "/";
            }, 2000);
        }
    }
    return (
        <section className="seller-register">
            <span className="d-flex flex-column align-items-center my-4">
                <img src={logo} alt="" width="100px" />
                <h1>Become Seller In Sanjivni</h1>
            </span>
            <form method="post" onSubmit={handleSubmit} className="seller-form form w-50 m-auto">
                {
                    Alert.show && <div className={`alert alert-${Alert.AlertTitle}`}>
                        <strong>{Alert.AlertTitle}: </strong><span>{Alert.alertMsg}</span>
                    </div>
                }
                <input type="text" name="seller-name" className="seller-name form-control" placeholder="Your Username Here." onChange={handleChange} />
                <input type="text" name="seller-email" className="seller-email form-control my-4" placeholder="Your Organizational Email Here." onChange={handleChange} />
                <input type="password" name="seller-pass" className="create-pass form-control mb-4" placeholder="Create Your Password Here." onChange={handleChange} />
                <span>if don't have an account? <Link to="/become-seller">Register Here.</Link></span><br />
                <button type="submit" className="btn btn-primary mt-3">Login</button>
            </form>
        </section>
    )
}

function formReducer(state, event) {
    return {
        ...state,
        [event.name]: event.value
    }
}

const Authenticate = (formData) => {
    const check = new FormData();
    // verification expressions.
    const verifyEmail = /[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,}$/;
    const verifyPaswd = /(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{7,13}$/;
    // verify email.
    if (!verifyEmail.test(formData["seller-email"])) {
        check.append("EmailVerify", "your email is incorrect!");
    }
    // verify passwords.
    if (!verifyPaswd.test(formData["seller-pass"])) {
        check.append("pswd_Verify", "please check, password must includes uppercase, numerics & special-chars.");
    } else if (formData["seller-pass"].length <= 8) {
        check.append("pswd_Verify", "please password must be 8 chars.");
        console.log("please password must be 8 chars.");
    } else {
        check.append("Verify", true);
    }
    return check;
}