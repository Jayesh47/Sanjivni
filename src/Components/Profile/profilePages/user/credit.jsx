import React from "react";
import { Link } from "react-router-dom";

export default function Credit() {
    return (
        <section className="user-section">
            <h1 className="ms-5 mt-4">Credit Points</h1>
            <div className="credit-point card w-50 ms-5 mt-3 p-2">
                <h2>25 Points Available</h2>
                <p>Note: You get discount on future order using these points 100Rs. on every 1000pt.</p>
                <span><b>Warning:</b> You don't have Much Points.</span>
                <Link to="/apply-credit" className="btn btn-primary w-25 mt-3 fw-bold">Apply Points</Link>
            </div>
        </section>
    )
}