import React from "react";
import { useParams } from "react-router-dom";
import img from '../../static/plant.jpg';
import UserComment from "./comment";
import { Link } from "react-router-dom";
import './store.css';

export default function Product_View() {
    const { id } = useParams();
    return (
        <section className="productReview">
            <div className="product-detail d-flex mt-5">
                <div className="product-img w-50 p-3">
                    <img src={img} alt="" width="100%" height="100%" />
                </div>
                <div className="details w-50 p-3">
                    <h2 className="ms-4">Beautiful Pink White Roses | 20pcs. with Beautiful Flower Pot.</h2>
                    <h3 className="my-3 ms-4"><span className="percent">-16.66%</span> Rs. 2500.00</h3>
                    <span className="text-secondary fw-bold ms-4">M.R.P. Rs. <strike>3000.00</strike></span>
                    <div className="description d-flex mt-3">
                        <ul className="desc-head fw-bold">
                            <li>Product</li>
                            <li>Quantity</li>
                            <li>Size</li>
                            <li>Description</li>
                        </ul>
                        <ul className="desc">
                            <li>White Roses with flowerpot</li>
                            <li>20pcs.</li>
                            <li>100cms.</li>
                            <li>This is most Beautiful White Roses with flowerpot.</li>
                        </ul>
                    </div>
                    <div className="buy-btns">
                        <Link className="btn btn-primary ms-4">Buy Now</Link>
                        <Link className="btn btn-primary mx-3">Add To Cart</Link>
                    </div>
                </div>
            </div>
            <UserComment />
        </section>
    )
}