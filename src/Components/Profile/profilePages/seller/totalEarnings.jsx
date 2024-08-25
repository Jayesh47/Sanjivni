import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Withdarwals from "./withdrawl";

export default function TotalEarnings() {
    const [getTotal, setTotal] = useState("");
    const [getRemaining, setRemaining] = useState({
        remaining: "",
        timeStamp: "",
        lastWithdraw: "",
        totalWithdraw: "",
        show: true
    });
    const seller = localStorage.getItem('token');

    const getTotalEarning = async () => {
        const total = [];
        let sum = 0;
        const api = await axios.put('http://localhost:8000/seller/purchased-products', { token: seller });
        let data = api.data;
        data = JSON.parse(data["items"]);
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                total.push(data[i][j]["item_price"] * data[i][j]["item_qty"]);
            }
        }
        total.forEach(_earn => {
            sum += _earn;
        });
        setTotal(sum);
    }

    const getRemainingAmt = async () => {
        const api = await axios.put("http://localhost:8000/seller/withdawal-earnings", { token: btoa(btoa(seller)) });
        const res = api.data
        if (res["warn"] === false) {
            setRemaining({
                remaining: "No Previous Withdrawals Found!",
                show: false
            });
        } else {
            setRemaining({
                lastWithdraw: res["lastWithdrawal"],
                totalWithdraw: res["totalWithdrawal"],
                timeStamp: res["timeStamp"],
                show: true
            });
        }
    }

    useEffect(() => { getTotalEarning(); getRemainingAmt(); }, []);
    return (
        <section className="total-earnings">
            <h3 className="text-center my-4">Earning Status</h3>
            <div className="d-flex justify-content-evenly flex">
                <div className="earning-card p-3 card w-25 mx-3">
                    <h4>Total Earnings</h4>
                    <hr />
                    <h4>(Rs.) {getTotal}</h4>
                </div>
                <div className="withdraw-card card w-25 p-3 mx-3">
                    <h4>Last Withdrawals</h4>
                    <hr />
                    <h4>(Rs.) {getRemaining.lastWithdraw}</h4>
                    <span className="text-success fw-bold"></span>
                </div>
                <div className="withdraw-card card w-25 p-3 mx-3">
                    <h4>Total Withdrawals</h4>
                    <hr />
                    <h4>(Rs.) {getRemaining.totalWithdraw}</h4>
                    <span className="text-success fw-bold"></span>
                </div>
                <div className="withdraw-card card w-25 p-3 mx-3">
                    <h4>Current Balance</h4>
                    <hr />
                    <h4>(Rs.) {getTotal - getRemaining.totalWithdraw}</h4>
                    <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-success mt-3">Withdraw</button>
                </div>
            </div>
            <Withdarwals totalPayments={getTotal} remaining={getTotal - getRemaining.totalWithdraw} />
        </section>
    )
}

