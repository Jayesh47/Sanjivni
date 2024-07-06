import React from "react";
import Contact from "./contact";
import img1 from '../../static/tree1.jpg';
import img2 from '../../static/tree2.jpg';
import img3 from '../../static/tree3.jpg';
import card1 from '../../static/plant.jpg';
import offer1 from '../../static/offer2.png';
import { Link } from "react-router-dom";
import offer from '../../static/offer.png';
import reward from '../../static/rewards.jpg';
import delivery from '../../static/delivery.jpg';
import user from '../../static/users-freinds.png';

export default function HomePage() {
    return (
        <section>
            <div className="homepage">
                <div className="category-options d-flex justify-content-center align-items-center">
                    <div className="option d-flex flex-column mx-2 justify-content-center align-items-center">
                        <img src={offer} alt="" width="120px" height="120px" />
                        <h5 className="text-dark text-uppercase">Offers</h5>
                    </div>
                    <div className="option d-flex flex-column mx-2 justify-content-center align-items-center">
                        <img src={img1} alt="" width="120px" height="120px" />
                        <h5 className="text-dark text-uppercase">gardening</h5>
                    </div>
                    <div className="option d-flex flex-column mx-2 justify-content-center align-items-center">
                        <img src={img2} alt="" width="120px" height="120px" />
                        <h5 className="text-dark text-uppercase">plants</h5>
                    </div>
                    <div className="option d-flex flex-column mx-2 justify-content-center align-items-center">
                        <img src={img1} alt="" width="120px" height="120px" />
                        <h5 className="text-dark text-uppercase">seeds</h5>
                    </div>
                    <div className="option d-flex flex-column mx-2 justify-content-center align-items-center">
                        <img src={img2} alt="" width="120px" height="120px" />
                        <h5 className="text-dark text-uppercase">bulbs</h5>
                    </div>
                    <div className="option d-flex flex-column mx-2 justify-content-center align-items-center">
                        <img src={img1} alt="" width="120px" height="120px" />
                        <h5 className="text-dark text-uppercase">corporate</h5>
                    </div>
                    <div className="option d-flex flex-column mx-2 justify-content-center align-items-center">
                        <img src={img2} alt="" width="120px" height="120px" />
                        <h5 className="text-dark text-uppercase">fertilizers</h5>
                    </div>
                    <div className="option d-flex flex-column mx-2 justify-content-center align-items-center">
                        <img src={img2} alt="" width="120px" height="120px" />
                        <h5 className="text-dark text-uppercase">pots</h5>
                    </div>
                </div>
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
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="middle d-flex flex-column">
                <h3 className="text-center my-5 text-decoration-underline">Grow For Yourself!</h3>
                <div className="tagline d-flex justify-content-around align-items-center">
                    <span>
                        <img src={user} alt="" width="80px" height="80px" />
                        <h3>Help</h3>
                    </span>
                    <span>
                        <img src={delivery} alt="" width="80px" height="80px" />
                        <h3>Track Order</h3>
                    </span>
                    <span>
                        <img src={offer1} alt="" width="80px" height="80px" />
                        <h3>Offer</h3>
                    </span>
                    <span>
                        <img src={reward} alt="" width="80px" height="80px" />
                        <h3>Rewards</h3>
                    </span>
                </div>
            </div>
            <div className="latest mt-5">
                <h2 className="text-center mb-4">Recently Added</h2>
                <div className="item-cards d-flex justify-content-around flex-wrap">
                    <Link to="/" className="product-card d-flex mx-3 my-2 border text-dark text-decoration-none flex-column">
                        <div className="card-img px-3 pt-3">
                            <img src={card1} alt="" width="220px" height="200px" />
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
                    <Link to="/" className="product-card d-flex mx-3 my-2 border text-dark text-decoration-none flex-column">
                        <div className="card-img px-3 pt-3">
                            <img src={card1} alt="" width="220px" height="200px" />
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
                    <Link to="/" className="product-card d-flex mx-3 my-2 border text-dark text-decoration-none flex-column">
                        <div className="card-img px-3 pt-3">
                            <img src={card1} alt="" width="220px" height="200px" />
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
                    <Link to="/" className="product-card d-flex mx-3 my-2 border text-dark text-decoration-none flex-column">
                        <div className="card-img px-3 pt-3">
                            <img src={card1} alt="" width="220px" height="200px" />
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
                    <Link to="/" className="product-card d-flex mx-3 my-2 border text-dark text-decoration-none flex-column">
                        <div className="card-img px-3 pt-3">
                            <img src={card1} alt="" width="220px" height="200px" />
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
                    <Link to="/" className="product-card d-flex mx-3 my-2 border text-dark text-decoration-none flex-column">
                        <div className="card-img px-3 pt-3">
                            <img src={card1} alt="" width="220px" height="200px" />
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
                    <Link to="/" className="product-card d-flex mx-2 my-2 border text-dark text-decoration-none flex-column">
                        <div className="card-img px-3 pt-3">
                            <img src={card1} alt="" width="220px" height="200px" />
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
                    <Link to="/" className="product-card d-flex mx-3 my-2 border text-dark text-decoration-none flex-column">
                        <div className="card-img px-3 pt-3">
                            <img src={card1} alt="" width="220px" height="200px" />
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