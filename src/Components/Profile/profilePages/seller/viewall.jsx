import React from "react";
import product_img from '../../../../static/plant.jpg';

export default function ViewAll() {
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
                    <tr>
                        <td><img src={product_img} alt="" width="200px" height="140px" /></td>
                        <td className="align-middle fw-bold">White Beautiful Roses</td>
                        <td className="align-middle fw-bold">20 pcs.</td>
                        <td className="align-middle fw-bold"><button type="submit" className="btn btn-danger w-100">Edit</button></td>
                        <td className="align-middle fw-bold"><button type="submit" className="btn btn-danger">Remove</button></td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}