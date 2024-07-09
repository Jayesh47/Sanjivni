import React, { useReducer, useState } from "react";
import '../../admin.css';
import axios from "axios";

const formReducer = (state, event) => {
    return ({
        ...state,
        [event.name]: event.value
    });
}

const Authentication = (password) => {
    const check = new FormData();
    const verifyPaswd = /(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{7,13}$/;
    // verify passwords.
    if (!verifyPaswd.test(password["old-pass"])) {
        check.append("pswd_Verify", "please check, password must includes uppercase, numerics & special-chars.");
    } else if (password["old-pass"].length <= 8) {
        check.append("pswd_Verify", "please password must be 8 chars.");
        console.log("please password must be 8 chars.");
    }
    if (!verifyPaswd.test(password["new-pass"])) {
        check.append("pswd_Verify", "please check, password must includes uppercase, numerics & special-chars.");
    } else if (password["new-pass"].length <= 8) {
        check.append("pswd_Verify", "please password must be 8 chars.");
        console.log("please password must be 8 chars.");
    } else {
        check.append("Verify", true);
    }
    return check
}

export default function ForgotPassword() {
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
        const check = Authentication(formData);
        if (check.get('pswd_Verify')) {
            setAlert({
                AlertTitle: "warning",
                alertMsg: check.get("pswd_Verify"),
                show: true
            });
        } else if (check.get('Verify')) {
            const forgot = await axios.put("http://localhost:8000/user/user-forgot", formData);
            const response = forgot.data
            if (response["Status"] === "Success") {
                setAlert({
                    AlertTitle: "Success",
                    alertMsg: "Your password is changed.",
                    show: true
                });
            } else if (response["Status"] === "not matched"){
                setAlert({
                    AlertTitle: "Warning",
                    alertMsg: "incorrect password!",
                    show: true
                });
            }else if (response["Status"] === "invalid") {
                setAlert({
                    AlertTitle: "Warning",
                    alertMsg: "Invalid email address.",
                    show: true
                });
            }else {
                setAlert({
                    AlertTitle: "Warning",
                    alertMsg: "Your password is can't change, try again later!",
                    show: true
                });
            }
        }
    }

    return (
        <section className="user-section">
            {
                Alert.show && <div className="alert alert-success">
                    <strong>{Alert.AlertTitle}: </strong><span>{Alert.alertMsg}</span>
                </div>
            }
            <h1 className="ms-5 mt-4 text-center">Forgot Password</h1>
            <form method="post" className="form w-50 mt-4 border-2 border p-3 m-auto" onSubmit={handleSubmit}>
                <label>User Email</label>
                <input type="email" name="user-email" className="form-control mb-3" onChange={handleChange} placeholder="User Email here... " />
                <label>Current Password</label>
                <input type="password" name="old-pass" className="form-control mb-3" onChange={handleChange} placeholder="Current Password here... " />
                <label>New Password</label>
                <input type="password" name="new-pass" className="form-control mb-3" onChange={handleChange} placeholder="New Password here... " />
                <label>Re-Enter Password</label>
                <input type="password" name="confirm-pass" className="form-control mb-4" onChange={handleChange} placeholder="Re-Enter Password... " />
                <button type="submit" className="btn btn-primary fw-bold">Change Password</button>
            </form>
        </section>
    )
}