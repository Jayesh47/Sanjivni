import React from "react";
import '../../admin.css';

export default function ForgotPassword() {
    return (
        <section className="user-section">
            <h1 className="ms-5 mt-4 text-center">Forgot Password</h1>
            <form method="post" className="form w-50 mt-4 border-2 border p-3 m-auto">
                <label>Current Password</label>
                <input type="password" name="old-pass" className="form-control mb-3" placeholder="Current Password here... " />
                <label>New Password</label>
                <input type="password" name="new-pass" className="form-control mb-3" placeholder="New Password here... " />
                <label>Re-Enter Password</label>
                <input type="password" name="confirm-pass" className="form-control mb-4" placeholder="Re-Enter Password... " />
                <button type="submit" className="btn btn-primary fw-bold">Change Password</button>
            </form>
        </section>
    )
}