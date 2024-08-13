import React, { useEffect, useState } from "react";
import UserComment from "./comment";
import { Link } from "react-router-dom";
import './store.css';
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Product_View() {
    const { prodid } = useParams();
    const [Alert, setAlert] = useState({cartBtn: "", show: true, links: ""});
    const token = localStorage.getItem("token");
    const [item, setItem] = useState({ itemName: "", itemType: "", itemPrice: "", discPrice: "", itemDesc: "", itemDiscount: "", itemImg: "", itemCredit: "" });

    const productManage = async () => {
        checkCart();
        const getItem = await axios.put('http://localhost:8000/product/retrive-products', { 'prodId': atob(prodid) });
        const res = getItem.data;
        setItem({
            itemId: atob(prodid),
            itemName: res["itemName"],
            itemType: res["itemType"],
            itemPrice: res["itemPrice"],
            discPrice: res["discPrice"],
            itemDesc: res["itemDesc"],
            itemDiscount: res["itemDiscount"],
            itemImg: res["itemImg"],
            itemCredit: res["itemCredit"]
        });
    }

    
    const checkCart = async () => {
        const getRes = await axios.get("http://localhost:8000/product/check-cart", {params: {prodId: prodid, token: token}});
        if (getRes.data["Status"] === "exists") {
            setAlert({cartBtn: "Already Added", show: false, links: "/cart"});
        }else if (getRes.data["Status"] === "not exists") {
            setAlert({cartBtn: "Add To Cart", show: true});
        }else if (getRes.data["Status"] === "user not found") {
            setAlert({cartBtn: "Login Required", show: false, links: "/login"});
        }
    }
    useEffect(() => { productManage(); }, []);

    const handleCart = async () => {
        const getRes = await axios.get("http://localhost:8000/product/add-to-cart", { params: { "token": token, "prodId": prodid } });
        const res = getRes.data;
        if (res["Status"] === "Success") {
            window.location.reload();
        }else {
            setAlert({cartBtn: "Add To Cart", show: true});
        }
    }
    return (
        <section className="productReview">
            <div className="product-detail d-flex mt-5">
                <div className="product-img w-50 p-3">
                    <img src={"http://localhost:8000/productUpload/" + item.itemImg} alt="" width="100%" height="350px" />
                </div>
                <div className="details w-50 p-3">
                    <h2>{item.itemName}</h2>
                    <h3 className="my-3"><span className="percent text-danger">-{item.itemDiscount}%</span> ₹ {item.discPrice} Only</h3>
                    <h4>Credit Points: {item.itemCredit}</h4>
                    <span className="text-secondary fw-bold">M.R.P. ₹<strike>{item.itemPrice}</strike></span>
                    <div className="description mt-3">
                        (MRP inclusive of all taxes)
                        <ul className="desc-head">
                            <li>Shipping Charges ₹39</li>
                            <li>Dispatch in 7 days</li>
                            <li>Country of origin: India</li>
                            <li>{item.itemDesc}</li>
                        </ul>
                    </div>
                    <div className="buy-btns">
                        {Alert.show && <Link className="btn btn-success ms-4">Buy Now</Link>}
                        {Alert.show && <button onClick={handleCart} className="btn btn-danger mx-3">{Alert.cartBtn}</button>}
                        {!Alert.show && <Link to={Alert.links} className="btn btn-danger mx-3" >{Alert.cartBtn}</Link>}
                    </div>
                </div>
            </div>
            <UserComment />
        </section>
    )
}