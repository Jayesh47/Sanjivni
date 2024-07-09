import React from "react";
import './store.css';
// import card1 from '../../static/plant.jpg';
import { Link } from "react-router-dom";
import demo_dataset from "../../demo_dataset";

export default function Store() {
    return (
        <section className="store m-5">
            <div className="filter ms-3">
                <select name="filter" id="filter" className="form-select">
                    <option value="">--- Filters ---</option>
                    <option value="">Plants</option>
                    <option value="">Trees</option>
                    <option value="">Seeds</option>
                    <option value="">Fertilizers</option>
                </select>
            </div>
            <h1 className="text-center text-uppercase mt-3">Plants</h1>
            <div className="store-cards mt-5 d-flex justify-content-around flex-wrap">
                {
                    demo_dataset.map((data) => (
                        <Link to="/" className="product-card d-flex mx-3 my-3 text-dark text-decoration-none flex-column">
                            <div className="card-img px-3 pt-3">
                                <img src={data._image} alt="" width="220px" height="200px" />
                                <span className="tag">Save 12%</span>
                            </div>
                            <div className="card-body px-3 pb-3 d-flex flex-column">
                                <strike>₹ 750.00</strike>
                                <h3>₹ 599.00</h3>
                                <p>Michelia Champa, Son Champa (Orange, Grafted) - Plant</p>
                                <div className="review">
                                    <span><i className="fa fa-star"></i></span>
                                    <span><i className="fa fa-star"></i></span>
                                    <span><i className="fa fa-star"></i></span>
                                    <span><i className="fa fa-star"></i></span>
                                    <span><i className="fa fa-star"></i></span>
                                    <span className="ms-2 text-dark reviews">339 reviews</span>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </section>
    )
}