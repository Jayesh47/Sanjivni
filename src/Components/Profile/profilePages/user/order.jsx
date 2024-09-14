import React, { useLayoutEffect, useState } from "react";
import axios from 'axios';

export default function TrackOrder() {
    const [order, setorder] = useState([]);
    const trackOrders = async () => {
        let token = localStorage.getItem("token");
        const api = await axios.post("http://localhost:8000/user/track-order", {}, { headers: { 'Authorization': token } });
        const orders = api.data;
        setorder(orders);
    }
    useLayoutEffect(() => { trackOrders(); }, []);
    return (
        <section className="user-section">
            <h1 className="ms-5 mt-3">Track Your Order</h1>
            <ol className="your-orders container fw-bold card" style={{ "fontSize": "20px" }}>
                {
                    order.map((data, i) => (
                        <li className="d-flex my-3" key={i}>
                            <div className="thumbnail">
                                <img src={"http://localhost:8000/productUpload/" + data.thumbnail} alt="" width="200px" height="200p" />
                            </div>
                            <div className="d-flex flex-column justify-content-around ms-4">
                                <span>Name: {data.title} </span> 
                                <span>Price: {data.price} </span>
                                <span>TimeStamp: {data.purchTime} </span>
                            </div>
                        </li>
                    ))
                }
            </ol>
        </section>
    )
}