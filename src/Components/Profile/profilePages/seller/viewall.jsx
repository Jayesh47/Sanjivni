import React, { useEffect, useState } from "react";
import axios from 'axios';


export default function ViewAll() {
    const [product, setProduct] = useState([]);

    const handleProducts = async () => {
        const sellertoken = localStorage.getItem("token");
        const getProd = await axios.put("http://localhost:8000/seller/view-products", { 'token': sellertoken });
        const res = getProd.data;
        if (res) {
            const data = [];
            res.map((prod) => {
                const encText = btoa(prod["productId"]);
                data.push({
                    Name: prod["productTitle"],
                    img: prod["productImg"],
                    qty: prod["productQty"],
                    prodId: encText 
                });
            });
            setProduct(data);
        }
    }
    useEffect(() => { handleProducts() }, []);
    const handleRemove = async (title) => {
        const check = window.confirm("Are you sure, you want to delete this product?");
        if (check === true) {
            const getRes = await axios.get("http://localhost:8000/seller/remove-product",{params: { title: title.toString() }});
            if (getRes.data["Status"] === "Deleted") {
                window.location.reload();
            }
        }
    }
    return (
        <section className="viewAll">
            <h2 className="text-center my-4">All Products</h2>
            <table className="table w-75 m-auto">
                <thead>
                    <tr>
                        <th scope="col" className="product">Product Image</th>
                        <th scope="col" className="product">Product Title</th>
                        <th scope="col" className="product">Product Quantity</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((prod, i) => (
                        <tr key={i}>
                            <td><img src={"http://localhost:8000/productUpload/" + prod["img"]} alt="" width="200px" height="140px" /></td>
                            <td className="align-middle fw-bold">{prod["Name"]}</td>
                            <td className="align-middle fw-bold">{prod["qty"]}</td>
                            <td className="align-middle fw-bold"><button type="submit" className="btn btn-danger w-100" onClick={() => {window.location.href = "/edit-product/" + prod["prodId"]}}>Edit</button></td>
                            <td className="align-middle fw-bold"><button type="submit" className="btn btn-danger" onClick={() => { handleRemove(prod["Name"]) }}>Remove</button></td>
                        </tr>
                    ))}
                    {
                        product.length === 0 && <td><h3 className="text-danger">No Product Found.</h3></td>
                    }
                </tbody>
            </table>
        </section>
    )
}