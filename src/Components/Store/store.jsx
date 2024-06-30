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
            <div className="store-cards  d-flex justify-content-around flex-wrap">
                {
                    demo_dataset.map((data) => (
                        <div className="card d-flex mt-5" key={data.id}>
                            <div className="card-img">
                                <img src={data._image} alt="" width="280px" height="200px" />
                            </div>
                            <div className="card-body d-flex flex-column">
                                <h3>White Roses</h3>
                                <strong>Price: Rs. 2500.00 <strike>3000.00</strike></strong>
                                <Link to={'/product/'+data.id} className="view-more btn btn-primary mt-4">View More</Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}