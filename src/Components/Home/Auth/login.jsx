import React, { useReducer } from "react";
import logo from '../../../static/logo.png';
import { Link } from "react-router-dom";

function formReducer(state, event) {
    return {
        ...state,
        [event.name]: event.value
    }
}

export default function Login() {
    const [formData, setFormData] = useReducer(formReducer, {});

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({
            "name": e.target.name,
            "value": e.target.value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <section className="Login-page d-flex flex-column justify-content-center align-items-center mt-3">
            <span>
                <img src={logo} alt="" width="100px" />
            </span>
            <h1>Login To Sanjivni</h1>
            <form method="post"  className="login-form form d-flex mt-4 flex-column w-50 p-4">
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