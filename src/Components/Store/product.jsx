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
            <div className="product-detail d-flex mt-5 border">
                <div className="product-img w-50 p-3">
                    <img src={img} alt="" width="100%" height="100%" />
                </div>
                <div className="details w-50 p-3">
                    <table className="table w-100 h-100">
                        <tr>
                            <th scope="col" width="40%">Product Name</th>
                            <td width="60%">Pink Roses</td>
                        </tr>
                        <tr>
                            <th scope="col" width="40%">Product Price</th>
                            <td width="60%">(Rs.) 2500.00 <strike>3000.00</strike></td>
                        </tr>
                        <tr>
                            <th scope="col" width="40%">Discount</th>
                            <td width="60%">16.66 %</td>
                        </tr>
                        <tr>
                            <th scope="col" width="40%">Product Available Quantity</th>
                            <td width="60%">20 Plants Available.</td>
                        </tr>
                        <tr>
                            <th scope="col" width="40%">Product Description</th>
                            <td width="60%" className="prod-desc">They are Pink Roses available for purchasing, this plants are available in small Gamla. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil ut omnis tenetur itaque ex quo fuga fugiat eligendi molestias quae mollitia, inventore eum aspernatur enim iste laborum porro odio delectus? Dignissimos, sed beatae voluptatibus quae quam quod eaque, voluptatem quas id laudantium, mollitia error nisi. Nihil necessitatibus repellat iste suscipit.</td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="buying-btn text-center">
                                <Link to={"/Product_View/" + id} className="btn btn-primary fw-bold">Buy Now</Link>
                                <Link to={"/Product_View/" + id} className="btn btn-primary ms-5 fw-bold"><i className="fa fa-shopping-cart"></i> Add To Cart</Link>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <UserComment />
        </section>
    )
}