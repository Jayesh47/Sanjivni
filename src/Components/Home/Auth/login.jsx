import React, { useReducer, useState } from "react";
import logo from '../../../static/logo.png';
import { Link } from "react-router-dom";
import axios from "axios";

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
    if (!verifyEmail.test(formData["useremail"])) {
        check.append("EmailVerify", "your email is incorrect!");
    }
    // verify passwords.
    if (!verifyPaswd.test(formData["userpass"])) {
        check.append("pswd_Verify", "please check, password must includes uppercase, numerics & special-chars.");
    } else if (formData["userpass"].length <= 8) {
        check.append("pswd_Verify", "please password must be 8 chars.");
        console.log("please password must be 8 chars.");
    } else {
        check.append("Verify", true);
    }
    return check;
}

export default function Login() {
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
            const user = await axios.post('http://localhost:8000/user/user-login', formData);
            const response = user.data;
            console.log(response);
            if (response["status"] === "success") {
                localStorage.setItem('loginStatus', true);
                localStorage.setItem('role', "buyer");
                localStorage.setItem('token', response["user"]);

                window.location.href = "/";

            }else if (response["status"] === "incorrect") {
                setAlert({
                    AlertTitle: "warning",
                    alertMsg: "Your password is incorrect.",
                    show: true
                });
            }else if (response["status"] === "username") {
                setAlert({
                    AlertTitle: "warning",
                    alertMsg: "Username is incorrect.",
                    show: true
                });
            }else if(response["status"] === "not exists") {
                setAlert({
                    AlertTitle: "warning",
                    alertMsg: "User not exists, please register first.",
                    show: true
                });
            }
        }
    }
    return (
        <section className="Login-page d-flex flex-column justify-content-center align-items-center mt-3">
            <span>
                <img src={logo} alt="" width="100px" />
            </span>
            <h1>Login To Sanjivni</h1>
            <form method="post" onSubmit={handleSubmit} className="login-form form d-flex mt-4 flex-column w-50 p-4">
                {
                    Alert.show && <div className={`alert alert-${Alert.AlertTitle}`}>
                        <strong>{Alert.AlertTitle}: </strong><span>{Alert.alertMsg}</span>
                    </div>
                }
                <label htmlFor="username">Username</label>
                <input type="text" className="form-input p-1 mb-4" id="username" name="username" placeholder="Enter username" onChange={handleChange} />
                <label htmlFor="useremail">User-Email</label>
                <input type="email" className="form-input p-1 mb-4" name="useremail" id="useremail" placeholder="Enter useremail" onChange={handleChange} />
                <label htmlFor="userpass">User password</label>
                <input type="password" name="userpass" className="form-input p-1 mb-4" id="userpass" placeholder="Enter Password" onChange={handleChange} />
                <button type="submit" className="btn btn-primary w-25">Login</button>
                <span className="options">If you already have account? <Link to="/signin">Signup.</Link></span>
                <span className="options">If forgot password? <Link to="/">here.</Link></span>
            </form>
        </section>
    )
}