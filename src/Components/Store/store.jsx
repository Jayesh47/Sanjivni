import React, { useEffect, useState } from "react";
import './store.css';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

export default function Store() {
    const [getProduct, setProduct] = useState([]);
    const [Alert, setAlert] = useState({ alertTitle: "", alertmsg: "", show: false });
    const [itemType, setItemType] = useState("");
    const { filters } = useParams();

    const handleChange = (e) => {
        handleRetrival(e.target.value);
    }

    const handleRetrival = async (filter) => {
        if (filter === "" || filter === null || filter === undefined) {
            const getItem = await axios.put('http://localhost:8000/product/retrive-products');
            const res = getItem.data;
            if (res[0] !== "undefined" && res[0] !== undefined) {
                setProduct(res);
                setItemType("Nursery Products");
            } else {
                setAlert({
                    alertTitle: "Empty!",
                    alertmsg: "Currently No Products Available.",
                    show: true
                });
            }
        } else {
            const getItem = await axios.put('http://localhost:8000/product/retrive-products', { 'filter': filter });
            const res = getItem.data;
            if (res[0] !== "undefined" && res[0] !== undefined) {
                setProduct(res);
                setItemType(res[0]["itemType"]);
            } else {
                setAlert({
                    alertTitle: "Empty!",
                    alertmsg: "Currently No Products Available.",
                    show: true
                });
            }
        }
    }
    useEffect(() => {
        if (filters !== "undefined" && filters !== "undefined") {
            handleRetrival(filters);
        }else {
            handleRetrival("");
        }
    }, []);

    return (
        <section className="store m-5">
            <div className="filter ms-3">
                <select name="filter" id="filter" className="form-select" onChange={handleChange}>
                    <option value="">--- Filters ---</option>
                    <option value="Plants">Plants</option>
                    <option value="Trees">Trees</option>
                    <option value="Seeds">Seeds</option>
                    <option value="Fertilizers">Fertilizers</option>
                </select>
            </div>
            {!Alert.show && [<h1 className="text-center text-uppercase mt-3" key={0}>{itemType}</h1>,
            <div className="store-cards mt-5 d-flex justify-content-around flex-wrap" key={1}>
                {getProduct.map((data, i) => (
                    <Link to={"/product/" + btoa(data["itemId"])} className="product-card d-flex mx-3 my-3 text-dark text-decoration-none flex-column" key={i}>
                        <div className="card-img px-3 pt-3">
                            <img src={"http://localhost:8000/productUpload/" + data["thumbnail"]} alt="" width="220px" height="200px" />
                            <span className="tag">Save {data["discount"]}%</span>
                        </div>
                        <div className="card-body px-3 pb-3 d-flex flex-column">
                            <strike>₹ {data["price"]}</strike>
                            <h3>₹ {data["discRate"]}</h3>
                            <p>{data["title"]}</p>
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
                ))}
            </div>]}
            {Alert.show && <div className="text-center mt-5">
                <h1>{Alert.alertTitle}</h1>
                <h3>{Alert.alertmsg}</h3>
            </div>}
        </section>
    )
}