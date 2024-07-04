import React from "react";
import { Link } from "react-router-dom";

export default function ReviewDetails() {
    return(
        <section className="review-details">
            <h1 className="text-center my-4">Review Details</h1>
            <div className="form customer-details-review">
                <form method="post" className="form w-50 m-auto">
                    <input type="text" name="street-address" className="form-control border-dark" placeholder="Street Address..." />
                    <input type="text" name="city" className="form-control my-4 border-dark" placeholder="City" />
                    <input type="text" name="state" className="form-control border-dark" placeholder="State" />
                    <input type="text" name="pincode" className="form-control my-4 border-dark" placeholder="Pincode" />
                    <input type="text" name="landmark" className="form-control border-dark" placeholder="Landmark" />
                    <Link to="/checkout" className="btn btn-primary my-4">Proceed</Link>
                </form>
            </div>
        </section>
    )
}