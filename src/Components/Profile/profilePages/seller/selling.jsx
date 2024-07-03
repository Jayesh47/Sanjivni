import React from "react";
import selling_img from '../../../../static/tree1.jpg';

export default function Selling() {
    return (
        <section className="selling">
            <h1 className="text-center my-4">Selling History</h1>
            <table className="table w-75 m-auto">
                <thead>
                    <tr>
                        <th scope="col">Product Image</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Product Qty</th>
                        <th scope="col">Product Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="align-middle"><img src={selling_img} alt="" width="200px" height="160px" /></td>
                        <td className="align-middle">Chandan Trees</td>
                        <td className="align-middle">20 units</td>
                        <td className="align-middle">Not Picked</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}