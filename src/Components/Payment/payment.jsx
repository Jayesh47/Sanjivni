import React from "react";

export default function Payment() {
    return (
        <section className="payment-gateways">
            <h1 className="text-center">Payment Methods</h1>
            <div className="payment">
                <ul className="upis">
                    <li><i className="fab fa-google-pay"></i> Google Pay</li>
                    <li><i className="fab fa-paypal"></i> Paypal</li>
                    <li><i className="fab fa-apple-pay"></i> Apple Pay</li>
                    <li><i className="fab fa-amazon-pay"></i> Amazon Pay</li>
                </ul>
                <ul className="banks">
                    <li><i className="fa fa-credit-card"></i> Credit Card</li>
                    <li>HDFC Bank</li>
                    <li>SBI Bank</li>
                    <li>BOB Bank</li>
                </ul>
            </div>
        </section>
    )
}