import React from "react";
import cartimg from '../../static/plant.jpg';
import './cart.css';

export default function WishList() {
    return (
        <section className="cart-section">
            <div className="cart-heading text-center mt-4">
                <h3><span id="wish-icon"><i className="fa fa-heart"></i></span> Add To Wish-List (1)</h3>
            </div>
            <div className="cart-table p-3">
                <table className="table w-100 fw-bold m-auto">
                    <thead>
                        <tr>
                            <th scope="col">Product Image</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Price</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="align-middle"><img src={cartimg} alt="" width="200px" height="140px" /></td>
                            <td className="align-middle">White Beautiful Roses</td>
                            <td className="align-middle">(Rs.) 2500.00 <strike>3000.00</strike></td>
                            <td className="align-middle">Not Available</td>
                            <td className="align-middle"><button className="btn btn-danger">Remove</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}