import React, { useEffect, useState } from "react";
import axios from 'axios';
import './cart.css';
import { Link, useNavigate } from "react-router-dom";


export default function Cart() {
    const [qty, setQty] = useState(1);
    const [Items, setItems] = useState([]);
    const user = localStorage.getItem("token");
    const navigate = useNavigate();

    const [Alert, setAlert] = useState({
        AlertTitle: "",
        alertMsg: "",
        show: false
    });
    const qty_decrease = () => {
        if (qty >= 1) setQty(1);
        else setQty(qty - 1);
    }
    const qty_increase = () => { setQty(qty + 1); }
    const handleCartItems = async () => {
        const getRes = await axios.get("http://localhost:8000/product/cart-details", { params: { tokens: user } });
        const res = getRes.data;
        setItems(res);
    }
    useEffect(() => { handleCartItems() }, []);
    const handleRemove = async (ids) => {
        const getRes = await axios.delete("http://localhost:8000/product/remove-cartItem", { params: { itemId: btoa(ids) } });
        const res = getRes.data;
        if (res["Status"] === "Success") {
            navigate("/cart");
            setAlert({
                AlertTitle: res["Status"],
                alertMsg: "Item Removed Successfully.",
                show: true
            });
        } else {
            setAlert({
                AlertTitle: "Warning",
                alertMsg: res["Status"],
                show: true
            });
        }
    }

    return (
        <section className="cart-section">
            <div className="cart-heading text-center mt-4">
                <h3><i className="fa fa-shopping-cart"></i> Add To Cart ({Items.length})</h3>
            </div>
            <div className="cart-table p-3">
                    {
                        Alert.show && (
                            <div className="alert alert-primary">
                                <strong>{Alert.AlertTitle}: </strong> <span>{Alert.alertMsg}</span>
                            </div>
                        )
                    }
                <table className="table w-100 fw-bold m-auto">
                    <thead>
                        <tr>
                            <th scope="col">Product Image</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Price</th>
                            <th scope="col">Product Quantity</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Items.map((Item, i) => (
                                <tr key={i}>
                                    <td className="align-middle"><img src={"http://localhost:8000/productUpload/" + Item["ItemImage"]} alt="" width="200px" height="140px" /></td>
                                    <td className="align-middle">{Item.ItemName}</td>
                                    <td className="align-middle">₹ {Item.discPrice} <strike>₹ {Item.ItemPrice}</strike></td>
                                    <td className="align-middle">
                                        <div className="qty">
                                            <span className="minus" onClick={qty_decrease}>—</span>
                                            <span className="count">{qty}</span>
                                            <span className="plus" onClick={qty_increase}>+</span>
                                        </div>
                                    </td>
                                    <td className="align-middle"><button onClick={() => { handleRemove(Item["ItemId"]) }} className="btn btn-danger">Remove</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="total-billing  w-25 mt-5 p-2">
                <h3 className="ms-4">Total Billing</h3>
                <div className="d-flex">
                    <ul className="buying-headings">
                        <hr />
                        <li>Total Purchasing: </li>
                        <li>Delivery Charges: </li>
                        <li>Apply Credit Points: </li>
                        <li>Other Discounts: </li>
                        <hr />
                        <li className="total">Total Billing: </li>
                    </ul>
                    <ul className="pricing">
                        <hr />
                        <li>2500.00</li>
                        <li>25</li>
                        <li>0pt.</li>
                        <li>0%</li>
                        <hr />
                        <li className="total">2525.00</li>
                    </ul>
                    <hr />
                </div>
                <hr />
                <div className="checkout-link text-center">
                    <Link to="/review-details" className="btn btn-success w-100 fw-bold">Proceed To Checkout</Link>
                </div>
            </div>
            <div className="promo-code p-2">
                <input type="text" name="promo-code" id="promo-code" className="w-75 mx-3 p-3" placeholder="Apply Promo Code Here.." />
                <button type="submit" className="btn btn-success">Apply Code</button>
            </div>
        </section>
    )
}