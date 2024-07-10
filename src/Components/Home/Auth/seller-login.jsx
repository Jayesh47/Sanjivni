import React, { useReducer, useState } from "react";
import logo from '../../../static/logo.png';
import './authenticate.css';
import { Link } from "react-router-dom";
import axios from 'axios';

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
    const handleSubmit = async (e) => {
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
            const getRes = await axios.post("http://localhost:8000/seller/seller-login", formData);
            const res = getRes.data;
            if (res["Status"] === "Success") {
                localStorage.setItem('loginStatus', true);
                localStorage.setItem('role', "seller");
                localStorage.setItem('token', res["token"]);
                window.location.href = "/seller-profile";
            } else if (res["Status"] === "incorrect password") {
                setAlert({
                    AlertTitle: "Warning",
                    alertMsg: "Incorrect Password, Try Again!",
                    show: true
                });
            } else if (res["Status"] === "invalid name") {
                setAlert({
                    AlertTitle: "Warning",
                    alertMsg: "Incorrect Username!",
                    show: true
                });
            }
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
                    Alert.show && <div className="alert alert-secondary">
                        <strong>{Alert.AlertTitle}: </strong><span>{Alert.alertMsg}</span>
                    </div>
                }
                <input type="text" name="sellername" className="seller-name form-control" placeholder="Your Username Here." onChange={handleChange} />
                <input type="text" name="selleremail" className="seller-email form-control my-4" placeholder="Your Organizational Email Here." onChange={handleChange} />
                <input type="password" name="sellerpass" className="create-pass form-control mb-4" placeholder="Create Your Password Here." onChange={handleChange} />
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
    if (!verifyEmail.test(formData["selleremail"])) {
        check.append("EmailVerify", "your email is incorrect!");
    }
    // verify passwords.
    if (!verifyPaswd.test(formData["sellerpass"])) {
        check.append("pswd_Verify", "please check, password must includes uppercase, numerics & special-chars.");
    } else if (formData["sellerpass"].length <= 8) {
        check.append("pswd_Verify", "please password must be 8 chars.");
        console.log("please password must be 8 chars.");
    } else {
        check.append("Verify", true);
    }
    return check;
}