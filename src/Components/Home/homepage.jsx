import React from "react";
import Contact from "./contact";
import img1 from '../../static/tree1.jpg';
import img2 from '../../static/tree2.jpg';
import img3 from '../../static/tree3.jpg';
import card1 from '../../static/plant.jpg';
import logo from '../../static/logo.png';
import { Link, NavLink } from "react-router-dom";

export default function HomePage() {
    return (
        <section>
            <div className="homepage">
                <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={img1} className="d-block w-100" alt="" />
                        </div>
                        <div className="carousel-item">
                            <img src={img2} className="d-block w-100" alt="" />
                        </div>
                        <div className="carousel-item">
                            <img src={img3} className="d-block w-100" alt="" />
                        </div>
                    </div>
                </div>
                <div className="tagline position-absolute p-3">
                    <img src={logo} alt="" width="180px" height="140px" />
                    <h4>Grow For Yourself.</h4>
                </div>
            </div>
            <div className="latest mt-5">
                <h2 className="text-center mb-4">Recently Added</h2>
                <div className="item-cards d-flex justify-content-around flex-wrap">
                    <NavLink to="/" className="d-flex mx-3 my-2 border p-1 text-dark text-decoration-none flex-column">
                        <div className="card-img">
                            <img src={card1} alt="" width="200px" height="150px" />
                        </div>
                        <div className="card-body d-flex flex-column">
                            <h3>White Roses</h3>
                            <strong>Price: Rs. 2500.00 <strike>3000.00</strike></strong>
                            <strong className="text-success">Delivery Charges: Free</strong>
                        </div>
                    </NavLink>
                    <NavLink to="/" className="d-flex mx-3 my-2 border p-1 text-dark text-decoration-none flex-column">
                        <div className="card-img">
                            <img src={card1} alt="" width="200px" height="150px" />
                        </div>
                        <div className="card-body d-flex flex-column">
                            <h3>White Roses</h3>
                            <strong>Price: Rs. 2500.00 <strike>3000.00</strike></strong>
                            <strong className="text-success">Delivery Charges: Free</strong>
                        </div>
                    </NavLink>
                    <NavLink to="/" className="d-flex mx-3 my-2 border p-1 text-dark text-decoration-none flex-column">
                        <div className="card-img">
                            <img src={card1} alt="" width="200px" height="150px" />
                        </div>
                        <div className="card-body d-flex flex-column">
                            <h3>White Roses</h3>
                            <strong>Price: Rs. 2500.00 <strike>3000.00</strike></strong>
                            <strong className="text-success">Delivery Charges: Free</strong>
                        </div>
                    </NavLink>
                    <NavLink to="/" className="d-flex mx-3 my-2 border p-1 text-dark text-decoration-none flex-column">
                        <div className="card-img">
                            <img src={card1} alt="" width="200px" height="150px" />
                        </div>
                        <div className="card-body d-flex flex-column">
                            <h3>White Roses</h3>
                            <strong>Price: Rs. 2500.00 <strike>3000.00</strike></strong>
                            <strong className="text-success">Delivery Charges: Free</strong>
                        </div>
                    </NavLink>
                    <NavLink to="/" className="d-flex mx-3 my-2 border p-1 text-dark text-decoration-none flex-column">
                        <div className="card-img">
                            <img src={card1} alt="" width="200px" height="150px" />
                        </div>
                        <div className="card-body d-flex flex-column">
                            <h3>White Roses</h3>
                            <strong>Price: Rs. 2500.00 <strike>3000.00</strike></strong>
                            <strong className="text-success">Delivery Charges: Free</strong>
                        </div>
                    </NavLink>
                    <NavLink to="/" className="d-flex mx-3 my-2 border p-1 text-dark text-decoration-none flex-column">
                        <div className="card-img">
                            <img src={card1} alt="" width="200px" height="150px" />
                        </div>
                        <div className="card-body d-flex flex-column">
                            <h3>White Roses</h3>
                            <strong>Price: Rs. 2500.00 <strike>3000.00</strike></strong>
                            <strong className="text-success">Delivery Charges: Free</strong>
                        </div>
                    </NavLink>
                    <NavLink to="/" className="d-flex mx-3 my-2 border p-1 text-dark text-decoration-none flex-column">
                        <div className="card-img">
                            <img src={card1} alt="" width="200px" height="150px" />
                        </div>
                        <div className="card-body d-flex flex-column">
                            <h3>White Roses</h3>
                            <strong>Price: Rs. 2500.00 <strike>3000.00</strike></strong>
                            <strong className="text-success">Delivery Charges: Free</strong>
                        </div>
                    </NavLink>
                    <NavLink to="/" className="d-flex mx-3 my-2 border p-1 text-dark text-decoration-none flex-column">
                        <div className="card-img">
                            <img src={card1} alt="" width="200px" height="150px" />
                        </div>
                        <div className="card-body d-flex flex-column">
                            <h3>White Roses</h3>
                            <strong>Price: Rs. 2500.00 <strike>3000.00</strike></strong>
                            <strong className="text-success">Delivery Charges: Free</strong>
                        </div>
                    </NavLink>
                    <NavLink to="/" className="d-flex mx-3 my-2 border p-1 text-dark text-decoration-none flex-column">
                        <div className="card-img">
                            <img src={card1} alt="" width="200px" height="150px" />
                        </div>
                        <div className="card-body d-flex flex-column">
                            <h3>White Roses</h3>
                            <strong>Price: Rs. 2500.00 <strike>3000.00</strike></strong>
                            <strong className="text-success">Delivery Charges: Free</strong>
                        </div>
                    </NavLink>
                    <NavLink to="/" className="d-flex mx-3 my-2 border p-1 text-dark text-decoration-none flex-column">
                        <div className="card-img">
                            <img src={card1} alt="" width="200px" height="150px" />
                        </div>
                        <div className="card-body d-flex flex-column">
                            <h3>White Roses</h3>
                            <strong>Price: Rs. 2500.00 <strike>3000.00</strike></strong>
                            <strong className="text-success">Delivery Charges: Free</strong>
                        </div>
                    </NavLink>
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