import React, { useState } from "react";
import './pay.css';
import Methods from "./method";
import upi from '../../static/upi.png';
import bank from '../../static/bank.png';
export default function Payment() {
    const [type, setType] = useState('upis');
    const handleChange = (e) => {
        if (e.target.value === "google" || e.target.value === "paypal" || e.target.value === "amazon") {
            setType('upis');
        }else {
            setType('cards');
        }
    }
    return (
        <section className="payment-gateways">
            <h1 className="text-center mt-4">Payment Methods</h1>
            <div className="d-flex justify-content-center mt-5">
                <div className="payment w-50">
                    <ul className="upis w-50 m-auto p-4">
                        <div className="tags text-danger">
                            <h5><img src={upi} alt="" width="50px" height="40px" /> UPI PAYMENTS</h5>
                        </div>
                        <li>
                            <label htmlFor="google-pay"><i className="fab fa-google-pay"></i> Google Pay</label>
                            <span><input type="radio" name="payment" id="google-pay" value="google" onChange={handleChange} /></span>
                        </li>
                        <li>
                            <label htmlFor="paypal"><i className="fab fa-paypal"></i> Paypal</label>
                            <span><input type="radio" name="payment" id="paypal" value="paypal" onChange={handleChange} /></span>
                        </li>
                        <li>
                            <label htmlFor="amazon-pay"><i className="fab fa-amazon-pay"></i> Amazon Pay</label>
                            <span><input type="radio" name="payment" id="amazon-pay" value="amazon" onChange={handleChange} /></span>
                        </li>
                        <div className="tags text-danger mt-4">
                            <h5><img src={bank} alt="" width="40px" height="35px" /> CARD PAYMENTS</h5>
                        </div>
                        <li>
                            <label htmlFor="credit-card"><i className="fa fa-credit-card"></i> Credit Card</label>
                            <span><input type="radio" name="payment" id="credit-card" onChange={handleChange} /></span>
                        </li>
                        <li>
                            <label htmlFor="debit-card"><i className="fa fa-credit-card"></i> Debit Card</label>
                            <span><input type="radio" name="payment" id="debit-card" onChange={handleChange} /></span>
                        </li>
                        <li>
                            <label htmlFor="master-card"><i className="fab fa-cc-mastercard"></i> MasterCard</label>
                            <span><input type="radio" name="payment" id="master-card" onChange={handleChange} /></span>
                        </li>
                    </ul>
                </div>
                <Methods pay={type} />
            </div>
        </section>
    )
}