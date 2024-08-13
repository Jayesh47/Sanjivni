import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const formReducer = (state, event) => {
    return ({
        ...state,
        [event.name]: event.value
    });
}

export default function ReviewDetails() {
    const [review, setReview] = useState({});
    const [formData, setFormData] = useReducer(formReducer, {});
    const [Alert, setAlert] = useState({ AlertTitle: "", alertMsg: "", show: false });
    const token = localStorage.getItem("token");
    const fetchReviewDetails = async () => {
        const getRes = await axios.get("http://localhost:8000/user/review-details", { params: { token: token } });
        const res = getRes.data;
        if (res) {
            setReview({
                phone: res["phone"],
                address: res["address"],
                city: res["city"],
                state: res["state"],
                pincode: res["pincode"],
                landmark: res["landmark"]
            });
        }
    }
    useEffect(() => { fetchReviewDetails(); }, []);
    const handleChange = (e) => {
        setFormData({
            "name": e.target.name,
            "value": e.target.value
        });
    }
    const handleBuyerDetails = async (e) => {
        e.preventDefault();
        const getRes = await axios.put('http://localhost:8000/user/updateBuyerReview', { form: formData, token: token });
        const res = getRes.data;
        setAlert({
            AlertTitle: res["Status"],
            alertMsg: "Your data is updated.",
            show: true
        });
    }
    return (
        <section className="review-details">
            {
                Alert.show && (
                    <div className="alert alert-danger">
                        <strong>{Alert.AlertTitle}: </strong> <span>{Alert.alertMsg}</span>
                    </div>
                )
            }
            <h1 className="text-center my-4">Review Details</h1>
            <div className="form customer-details-review">
                <form method="post" className="form w-50 m-auto" onSubmit={handleBuyerDetails}>
                    <input type="text" name="phone" className="form-control border-dark mb-4" placeholder="Phone Number" defaultValue={review["phone"]} onChange={handleChange} />
                    <input type="text" name="street-address" className="form-control border-dark" placeholder="Street Address..." defaultValue={review.address} onChange={handleChange} />
                    <input type="text" name="city" className="form-control my-4 border-dark" placeholder="City" defaultValue={review.city} onChange={handleChange} />
                    <input type="text" name="state" className="form-control border-dark" placeholder="State" defaultValue={review.state} onChange={handleChange} />
                    <input type="text" name="pincode" className="form-control my-4 border-dark" placeholder="Pincode" defaultValue={review.pincode} onChange={handleChange} />
                    <input type="text" name="landmark" className="form-control border-dark" placeholder="Landmark" defaultValue={review.landmark} onChange={handleChange} />
                    <button type="submit" className="btn btn-primary my-4 w-25">Save</button>
                    {
                        Alert.show && (<Link to={"/checkout"} className="btn btn-danger ms-4">Proceed To Checkout</Link>)
                    }
                </form>
            </div>
        </section>
    )
}