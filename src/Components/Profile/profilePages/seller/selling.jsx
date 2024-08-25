import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Selling() {
    const [getHistory, setHistory] = useState([]);
    const handleHistory = async () => {
        const seller = localStorage.getItem('token');
        const api = await axios.put('http://localhost:8000/seller/purchased-products', {token: seller});
        let data = api.data;
        data = JSON.parse(data["items"]);
        for (let i = 0; i < data.length; i++) {
            setHistory(data);
        }
    }
    useEffect(() => { handleHistory() }, []);

    return (
        <section className="selling">
            <h1 className="text-center my-4">Products Sold</h1>
            <table className="table w-75 m-auto">
                <thead>
                    <tr>
                        <th scope="col">Product Image</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Product Qty</th>
                        <th scope="col">Selling Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        getHistory.map(_item => (
                            _item.map((_product, i) => (
                                <tr key={i}>
                                    <td className="align-middle"><img src={"http://localhost:8000/productUpload/" + _product["item_img"]} alt="" width="200px" height="160px" /></td>
                                    <td className="align-middle">{_product["item_name"]}</td>
                                    <td className="align-middle">{_product["item_qty"]}</td>
                                    <td className="align-middle">{_product["item_purchase_time"]}</td>
                                </tr>
                            ))
                        ))
                    }
                </tbody>
            </table>
        </section>
    )
}