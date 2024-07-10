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
// import user from '../../static/users-freinds.png';

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
                        {/* <img src={user} alt="" width="80px" height="80px" /> */}
                        <svg class="icon-people " aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">      <path d="M6.1875 14.4375C6.1875 16.4432 6.98426 18.3668 8.40251 19.785C9.82075 21.2032 11.7443 22 13.75 22C15.7557 22 17.6793 21.2032 19.0975 19.785C20.5157 18.3668 21.3125 16.4432 21.3125 14.4375C21.3125 12.4318 20.5157 10.5082 19.0975 9.09001C17.6793 7.67176 15.7557 6.875 13.75 6.875C11.7443 6.875 9.82075 7.67176 8.40251 9.09001C6.98426 10.5082 6.1875 12.4318 6.1875 14.4375V14.4375Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>      <path d="M1.375 37.125C1.375 33.8429 2.67879 30.6953 4.99955 28.3746C7.32032 26.0538 10.4679 24.75 13.75 24.75C17.0321 24.75 20.1797 26.0538 22.5004 28.3746C24.8212 30.6953 26.125 33.8429 26.125 37.125" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>      <path d="M26.312 18.5625C26.312 20.2035 26.9639 21.7773 28.1243 22.9377C29.2847 24.0981 30.8585 24.75 32.4995 24.75C34.1405 24.75 35.7144 24.0981 36.8747 22.9377C38.0351 21.7773 38.687 20.2035 38.687 18.5625C38.687 16.9215 38.0351 15.3477 36.8747 14.1873C35.7144 13.0269 34.1405 12.375 32.4995 12.375C30.8585 12.375 29.2847 13.0269 28.1243 14.1873C26.9639 15.3477 26.312 16.9215 26.312 18.5625V18.5625Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>      <path d="M28.9907 27.6247C30.5217 27.0604 32.1663 26.8743 33.7847 27.0821C35.4031 27.29 36.9473 27.8856 38.286 28.8184C39.6248 29.7512 40.7184 30.9936 41.4739 32.4398C42.2293 33.886 42.6243 35.4933 42.6252 37.125" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>    </svg>
                        <h3>Helpline</h3>
                    </span>
                    <span>
                        <img src={delivery} alt="" width="180px" height="80px" />
                        <h3>Track Order</h3>
                    </span>
                    <span>
                        <img src={offer1} alt="" width="90px" height="90px" />
                        <h3>Offer</h3>
                    </span>
                    <span>
                        <img src={reward} alt="" width="80px" height="85px" />
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