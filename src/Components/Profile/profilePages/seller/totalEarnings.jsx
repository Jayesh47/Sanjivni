import React from "react";

export default function TotalEarnings() {
    return (
        <section className="total-earnings">
            <h3 className="text-center my-4">Earning Status</h3>
            <div className="d-flex justify-content-evenly">
                <div className="earning-card p-3 card w-25">
                    <h4>Total Earnings</h4>
                    <hr />
                    <h4>(Rs.) 2500.00</h4>
                </div>
                <div className="withdraw-card card w-25 p-3">
                    <h4>Withdarwls</h4>
                    <hr />
                    <h4>(Rs.) 1000.00</h4>
                    <span className="text-success fw-bold">Last withdrawl on 03/07/2024.</span>
                </div>
                <div className="withdraw-card card w-25 p-3">
                    <h4>Current Balance</h4>
                    <hr />
                    <h4>(Rs.) 1500.00</h4>
                    <button type="submit" className="btn btn-success mt-3">Withdraw</button>
                </div>
            </div>
        </section>
    )
}