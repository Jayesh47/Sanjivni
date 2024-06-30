import React from "react";
import Contact from "./contact";
import img1 from '../../static/tree2.jpg';
import card1 from '../../static/plant.jpg';
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <section>
            <div className="homepage">
                <div className="welcome-block">
                    <img src={img1} alt="" />
                </div>
                <div className="taglines">
                    <Link to="/store" className="browse">Browse More</Link>
                </div>
            </div>
            <div className="latest mt-5">
                <h2 className="text-center">Recently Added</h2>
                <div className="item-cards d-flex justify-content-around flex-wrap">
                    <div className="card d-flex mt-5">
                        <div className="card-img">
                            <img src={card1} alt="" width="280px" height="200px" />
                        </div>
                        <div className="card-body d-flex flex-column">
                            <h3>White Roses</h3>
                            <strong>Price: Rs. 2500.00 <strike>3000.00</strike></strong>
                            <Link to="/signin?id=1001" className="view-more btn btn-primary mt-4">View More</Link>
                        </div>
                    </div>
                    <div className="card d-flex mt-5">
                        <div className="card-img">
                            <img src={card1} alt="" width="280px" height="200px" />
                        </div>
                        <div className="card-body d-flex flex-column">
                            <h3>White Roses</h3>
                            <strong>Price: Rs. 2500.00 <strike>3000.00</strike></strong>
                            <Link to="/signin?id=1002" className="view-more btn btn-primary mt-4">View More</Link>
                        </div>
                    </div>
                    <div className="card d-flex mt-5">
                        <div className="card-img">
                            <img src={card1} alt="" width="280px" height="200px" />
                        </div>
                        <div className="card-body d-flex flex-column">
                            <h3>White Roses</h3>
                            <strong>Price: Rs. 2500.00 <strike>3000.00</strike></strong>
                            <Link to="/signin?id=1003" className="view-more btn btn-primary mt-4">View More</Link>
                        </div>
                    </div>
                    <div className="card d-flex mt-5">
                        <div className="card-img">
                            <img src={card1} alt="" width="280px" height="200px" />
                        </div>
                        <div className="card-body d-flex flex-column">
                            <h3>White Roses</h3>
                            <strong>Price: Rs. 2500.00 <strike>3000.00</strike></strong>
                            <Link to="/" className="view-more btn btn-primary mt-4">View More</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Contact />
        </section>
    )
}

// intern code.
// import {Formik, Form, Field, ErrorMessage} from 'formik';
// import * as yup from yup;
/*
    <Formik initialvalue={initialValue}
            validationSchema={validationSchema}
            onSubmit={}
*/