import React, { useEffect, useState } from "react";
import axios from 'axios';
import './cart.css';
import { Link, useNavigate } from "react-router-dom";


export default function Cart() {
    const [qty, setQty] = useState([]);
    const [Items, setItems] = useState([]);
    const user = localStorage.getItem("token");
    const navigate = useNavigate();

    const [Alert, setAlert] = useState({
        AlertTitle: "",
        alertMsg: "",
        show: false,
        showContent: true
    });
    const qty_decrease = (pid) => {
        setQty((prevQty) => {
            const newQty = [...prevQty];
            newQty[pid] = Math.max(1, newQty[pid] - 1);
            return newQty;
        });
    }
    const qty_increase = (pid) => {
        if (qty[pid] < 10) {
            setQty((prevQty) => {
                const newQty = [...prevQty];
                newQty[pid] = newQty[pid] + 1;
                return newQty;
            });
        } else {
            qty[pid] = 10;
        }
    }
    const handleCartItems = async () => {
        const getRes = await axios.get("http://localhost:8000/product/cart-details", { params: { tokens: user } });
        const res = getRes.data;
        if (res === "No user") {
            setAlert({
                AlertTitle: "By Cart",
                alertMsg: "Please login to add items in cart.",
                show: true,
                showContent: false
            })
        }else {
            setItems(res);
            setQty(new Array(res.length).fill(1));
        }
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
    const calculateCreditPoint = () => {
        const totalCreditPoints = Items.reduce((acc, item) => acc + item.itemCredit, 0);
        if (totalCreditPoints >= 1000) {
            console.log(totalCreditPoints);
            return Math.floor(totalCreditPoints / 1000) * 100;
        }
        return 0;
    };
    const calculateTotalPurchasing = () => {
        return Items.reduce((acc, item, index) => {
            return Math.round((acc + (item.discPrice * qty[index])) * 100) / 100;
        }, 0);
    }
    localStorage.setItem('totalAmt', calculateTotalPurchasing() - calculateCreditPoint() + 15);

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
                                            <span className="minus" onClick={() => { qty_decrease(i) }}>—</span>
                                            <span className="count">{qty[i]}</span>
                                            <span className="plus" onClick={() => { qty_increase(i) }}>+</span>
                                        </div>
                                    </td>
                                    <td className="align-middle"><button onClick={() => { handleRemove(Item["ItemId"]) }} className="btn btn-danger">Remove</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {Alert.showContent &&<div className="total-billing  w-25 mt-5 p-2">
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
                        <li>{calculateTotalPurchasing()}</li>
                        <li>₹15</li>
                        <li>{calculateCreditPoint()}</li>
                        <li>0%</li>
                        <hr />
                        <li className="total">{calculateTotalPurchasing() - calculateCreditPoint() + 15}</li>
                    </ul>
                    <hr />
                </div>
                <hr />
                <div className="checkout-link text-center">
                    <button onClick={() => { if (saveStates(qty, Items)) window.location.href = '/review-details' }} className="btn btn-success w-100 fw-bold">Proceed To Checkout</button>
                </div>
            </div>}
        </section>
    )
}
const saveStates = async (qty, items) => {
    var data = [];
    items.map((item, i) => {
        data.push(
            [
                qty[i],
                item.ItemId
            ]
        );
    })
    await axios.put('http://localhost:8000/product/update-quantity', data);
    return true;
}