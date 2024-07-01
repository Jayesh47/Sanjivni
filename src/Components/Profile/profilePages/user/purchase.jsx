import React from "react";
import buying from '../../../../static/plant.jpg';
import { Link } from "react-router-dom";

export default function Purchase() {
    return (
        <section className="user-section">
            <h1 className="ms-5 mt-4">Purchase History</h1>
            <ul className="purchase mt-4">
                <Link to="/purchase-history" className="purchase-item w-75 m-auto d-flex border text-decoration-none text-dark">
                    <img src={buying} alt="" width="30%" height="140px" />
                    <div className="item-details ms-4 d-flex flex-column justify-content-center">
                        <h2>White Roses</h2>
                        <h4>Credit Points Earn: 25</h4>
                        <h5>2500.00 <strike>3000.00</strike></h5>
                    </div>
                </Link>
            </ul>
        </section>
    )
}