import React, { useState } from "react";
import cartimg from '../../static/plant.jpg';
import './cart.css';
import { Link } from "react-router-dom";

export default function Cart() {
    const [qty, setQty] = useState(1);
    const qty_decrease = () => {
        if (qty >= 1)
            setQty(1);
        else 
            setQty(qty - 1);
    }
    const qty_increase = () => {
        setQty(qty + 1);
    }

    return (
        <section className="cart-section">
            <div className="cart-heading text-center mt-4">
                <h3><i className="fa fa-shopping-cart"></i> Add To Cart (1)</h3>
            </div>
            <div className="cart-table p-3">
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
                        <tr>
                            <td className="align-middle"><img src={cartimg} alt="" width="200px" height="140px" /></td>
                            <td className="align-middle">White Beautiful Roses</td>
                            <td className="align-middle">(Rs.) 2500.00 <strike>3000.00</strike></td>
                            <td className="align-middle">
                                <div className="qty">
                                    <span className="minus" onClick={qty_decrease}>—</span>
                                    <span className="count">{qty}</span>
                                    <span className="plus" onClick={qty_increase}>+</span>
                                </div>
                            </td>
                            <td className="align-middle"><button className="btn btn-danger">Remove</button></td>
                        </tr>
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
                    <Link to="/cart" className="btn btn-success w-100 fw-bold">Proceed To Checkout</Link>
                </div>
            </div>
            <div className="promo-code p-2">
                <input type="text" name="promo-code" id="promo-code" className="w-75 mx-3 p-3" placeholder="Apply Promo Code Here.." />
                <button type="submit" className="btn btn-success">Apply Code</button>
            </div>
        </section>
    )
}