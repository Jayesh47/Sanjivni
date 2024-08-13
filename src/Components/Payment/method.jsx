import React, { useEffect, useReducer, useState } from "react";
import './pay.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from "react-router-dom";

const formReducer = (state, event) => {
    return ({
        ...state,
        [event.name]: event.value
    });
}

const verifyForm = (target) => {
    if (target.name === "expiry") {
        const pattern = /^[0-9][0-9]$/;
        if (pattern.test(target.value)) {
            target.value += '/';
        }
    }
    if (target.name === "card-number") {
        const input = target.value.replace(/\D/g, '');
        if (input.length <= 15) {
            const formttedNumber = input.replace(/(\d{4})/g, '$1-');
            target.value = formttedNumber;
        }
    }
}

export default function Methods({ pay }) {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [showPay, setPay] = useState(false);
    const cust_id = jwtDecode(localStorage.getItem('token'));
    const totalAmt = localStorage.getItem('totalAmt');
    const handleChange = (e) => {
        verifyForm(e.target);
        setFormData({
            "name": e.target.name,
            "value": e.target.value
        });
    }
    useEffect(() => {
        if (pay === "cards") {
            setPay(true);
        } else {
            setPay(false);
        }
    });
    const handleSubmit = async (e) =>{ 
        e.preventDefault();
        if (formData["user-upi"]) formData["pay_type"] = 'UPI';
        else formData["pay_type"] = 'CARD';

        formData["totalAmt"] = totalAmt;
        formData["cust_id"] = cust_id["userId"];

        const api = await axios.post("http://localhost:8000/product/payment-gateway", formData);
        if (api.data === "Success") {
            window.location.href = '/success-greeting';
        }
    }

    return (
        <aside className="payment-type">
            <div className="payment-methods text-danger">
                <h5>PAYMENT TYPE</h5>
            </div>
            {!showPay && <form className="getupi" onSubmit={handleSubmit}>
                <label htmlFor="user-upi" className="fw-bold">Enter UPI ID</label>
                <input type="text" name="user-upi" id="user-upi" placeholder="UPI ID: example@ybi" onChange={handleChange} required />
                <button type="submit" className="btn btn-danger mt-4 w-25 fw-bold">Payment</button>
            </form>}
            {showPay && <form method="POST" className="getbank" onSubmit={handleSubmit}>
                <label htmlFor="bank-number" className="fw-bold">Card Number</label>
                <input type="text" name="card-number" maxLength={19} id="card-number" className="w-100" placeholder="Credit card number: xxxx-xxxx-xxxx" onChange={handleChange} required />
                <div className="d-flex">
                    <input type="text" name="expiry" id="expiry" className="w-25 text-center mt-4" placeholder="MM/DD" onChange={handleChange} required />
                    <input type="text" name="cvv" id="cvv" className="w-25 text-center mt-4" placeholder="CVC/CVV" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-danger mt-4 w-25 fw-bold">Payment</button>
            </form>}
            <div className="amt mt-5">
                <h3 className="text-secondary">Total Bill: Rs. {totalAmt}</h3>
                <span className="text-secondary">(All taxes are includes.)</span>
            </div>
        </aside>
    )
}