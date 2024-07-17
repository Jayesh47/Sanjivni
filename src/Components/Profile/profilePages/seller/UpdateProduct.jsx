import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";

const formReducer = (state, event) => {
    return ({
        ...state,
        [event.name]: event.value
    });
}

export default function UpdateProduct() {
    const { product } = useParams();
    const decText = atob(product);
    const [formData, setFormData] = useReducer(formReducer, {});
    const [getProd, setProduct] = useState({ name: "", img: "", desc: "", disc: "", price: "", qty: "" });
    const [prodImg, setProdImg] = useState("");
    const [Alert, setAlert] = useState({AlertTitle: "", AlertMsg: "", show: false});
    
    const handleImage = (e) => {
        setProdImg(e.target.files[0]);
        console.log(e.target.files[0]);
    }

    const handleChange = (e) => {
        setFormData({
            "name": e.target.name,
            "value": e.target.value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        formData["prodImg"] = prodImg;
        formData["prodId"] = decText;
        console.log(formData);
        const getRes = await axios.put("http://localhost:8000/seller/product-update", formData, {'headers': {'Content-Type': 'multipart/form-data'}});
        const res = getRes.data;
        if (res["Status"]) {
            if (res["Status"] === "Success") {
                setAlert({
                    AlertTitle: res["Status"],
                    AlertMsg: "Your product is updated...!",
                    show: true
                });
            }else {
                setAlert({
                    AlertTitle: res["Status"],
                    AlertMsg: "Your product is not updated due to internal processing!",
                    show: true
                });
            }
        }
    }
    
    const handleRetrieval = async () => {
        const getRes = await axios.get("http://localhost:8000/seller/product-details", {params: { _productId: decText }});
        const res = getRes.data;
        setProduct({
            name: res["prodName"], img: res["prodImg"],
            desc: res["prodDesc"], disc: res["prodDisc"],
            price: res["prodPrice"], qty: res["prodQty"]
        });
    }
    useEffect(() => { handleRetrieval(); }, []);
    return (
        <section className="update-product">
            {
                Alert.show && (
                    <div className="alert alert-success">
                        <strong>{Alert.AlertTitle}</strong> <span>{Alert.AlertMsg}</span>
                    </div>
                )
            }
            <div className="text-center my-4">
                <h2>{getProd.name}</h2>
            </div>
            <div className="d-flex justify-content-around">
                <div className="product-img box-shadow-2">
                    <img src={"http://localhost:8000/productUpload/" + getProd.img} alt="" width="250px" height="200px" />
                </div>
                <form method="POST" className="product-details form w-75" onSubmit={handleSubmit} encType="multipart/form-data">
                    <input type="file" name="item-pic" className="form-control border-primary" onChange={handleImage} />
                    <input type="text" name="item-title" className="item-title form-control my-4 border-primary" placeholder="Item Title Here..." defaultValue={getProd.name} onChange={handleChange} />
                    <input type="text" name="item-price" className="item-description form-control border-primary" placeholder="Item MRP Price..." onChange={handleChange} defaultValue={getProd.price} />
                    <input type="text" name="item-discount" className="item-discount form-control my-4 border-primary" placeholder="Item Discount eg: 12" onChange={handleChange} defaultValue={getProd.disc} />
                    <input type="text" name="item-qty" className="item-qty form-control my-4 border-primary" placeholder="Item Quantity..." onChange={handleChange} defaultValue={getProd.qty} />
                    <textarea name="item-description" className="form-control border-primary" placeholder="Item Description Here..." onChange={handleChange} defaultValue={getProd.desc} ></textarea>
                    <select name="item-category" className="form-select my-4 border-primary" onChange={handleChange}>
                        <option value="">---Choose Category---</option>
                        <option value="Plants">Plant</option>
                        <option value="Trees">Tree</option>
                        <option value="Seeds">Seeds</option>
                        <option value="Pots">Pots</option>
                        <option value="Fertilizers">Fertilizers</option>
                        <option value="Gardening">Gardening</option>
                        <option value="Corporate">Corporate</option>
                    </select>
                    <button type="submit" className="btn btn-primary my-4">Update</button>
                </form>
            </div>
        </section>
    );
}