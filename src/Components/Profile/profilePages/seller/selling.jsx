import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Selling() {
    const [getHistory, setHistory] = useState([]);
    const handleHistory = async () => {
        const seller = jwtDecode(localStorage.getItem('token'))["userId"];
        const api = await axios.put('http://localhost:8000/seller/purchased-products', { _seller: btoa(btoa(seller)) });
        const data = api.data;
        console.log(data);
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
                    <tr>
                        <td className="align-middle"><img src={"http://localhost:8000/productUpload/"} alt="" width="200px" height="160px" /></td>
                        <td className="align-middle"></td>
                        <td className="align-middle"></td>
                        <td className="align-middle"></td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}