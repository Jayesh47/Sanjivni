import React, { useReducer, useState } from "react";
import logo from '../../../static/logo.png';
import './authenticate.css';
import { Link } from "react-router-dom";
import axios from 'axios';

function formReducer(state, event) {
    return ({
        ...state,
        [event.name]: event.value
    })
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
    if (!verifyPaswd.test(formData["create-pass"])) {
        check.append("pswd_Verify", "please check, password must includes uppercase, numerics & special-chars.");
    } else if (formData["create-pass"].length <= 8) {
        check.append("pswd_Verify", "please password must be 8 chars.");
    } else if (formData["create-pass"] !== formData["confirm"]){
        check.append('pswd_Verify', "Your password are not matched!");
    } else {
        check.append("Verify", true);
    }
    return check;
}

export default function BecomeSeller() {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [Alert, setAlert] = useState({ AlertTitle: "", alertMsg: "", show: false });
    const handleChange = (e) => {
        e.preventDefault();
        setFormData({
            "name": e.target.name,
            'value': e.target.value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const check = Authenticate(formData);

        if (check.get("EmailVerify")) {
            setAlert({
                AlertTitle: "Warning",
                alertMsg: check.get("EmailVerify"),
                show: true
            });
        } else if (check.get("pswd_Verify")) {
            setAlert({
                AlertTitle: "Warning",
                alertMsg: check.get('pswd_Verify'),
                show: true
            });
        } else if (check.get("Verify")) {
            const getRes = await axios.put("http://localhost:8000/seller/seller-register", formData);
            const res = getRes.data;
            if (res["Status"] === "exists") {
                setAlert({
                    AlertTitle: "Exists",
                    alertMsg: "Your data is already exists please login.",
                    show: true
                });
            }else if (res["Status"] === "process") {
                setAlert({
                    AlertTitle: "Note",
                    alertMsg: "Server is busy.",
                    show: true
                });
            }else {
                window.location.href = "/seller-login";
            }
        }
    }
    return (
        <section className="seller-register">
            <span className="d-flex flex-column align-items-center my-4">
                <img src={logo} alt="" width="100px" />
                <h1>Become Seller In Sanjivni</h1>
            </span>
            <form method="post" className="seller-form form w-50 m-auto" onSubmit={handleSubmit}>
                {
                    Alert.show && <div className='alert alert-success'>
                        <strong>{Alert.AlertTitle}: </strong><span>{Alert.alertMsg}</span>
                    </div>
                }
                <input type="text" name="seller-name" className="seller-name form-control" placeholder="Your Username Here." onChange={handleChange} />
                <input type="text" name="seller-email" className="seller-email form-control my-4" placeholder="Your Organizational Email Here." onChange={handleChange} />
                <input type="password" name="create-pass" className="create-pass form-control" placeholder="Create Your Password Here." onChange={handleChange} />
                <input type="password" name="confirm" className="confirm form-control my-4" placeholder="Confirm Your Password." onChange={handleChange} />
                <span>if already have an account? <Link to="/seller-login">Login Here.</Link></span><br />
                <button type="submit" className="btn btn-primary mt-3">Register</button>
            </form>
        </section>
    )
}