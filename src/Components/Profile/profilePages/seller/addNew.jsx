import React, { useReducer, useState } from "react";
import product_img from '../../../../static/plant.jpg';
import "../../admin.css";
import axios from "axios";

const formReducer = (state, event) => {
    return ({
        ...state,
        [event.name]: event.value
    });
}

export default function AddNewItem() {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [prodImg, setProdImg] = useState({ thumbnail: "" });
    const [Alert, setAlert] = useState({ AlertTitle: "", alertMsg: "", show: false });
    const [note, setNote] = useState({ "Note": "", Show: false });

    const handleImage = (e) => {
        setProdImg({ ...prodImg, thumbnail: e.target.files[0] });
    }

    const handleChange = (e) => {
        setFormData({
            "name": e.target.name,
            "value": e.target.value
        });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const NewItem = new FormData();
        const disc = /(?=.*[0-9]).{2,2}$/;
        const token = localStorage.getItem("token");
        NewItem.append("prodImg", prodImg.thumbnail);
        NewItem.append("title", formData["item-title"]);
        NewItem.append("price", formData["item-price"]);
        NewItem.append("discount", formData["item-discount"]);
        NewItem.append("qty", formData["item-qty"]);
        NewItem.append("description", formData["item-description"]);
        NewItem.append("category", formData["item-category"]);
        NewItem.append("token", token);

        if (!disc.test(formData["item-discount"])) {
            setNote({ Note: "only float or integer number are allowed.", Show: true });
        } else if (!disc.test(formData["item-price"])) {
            setNote({ Note: "only float or integer number are allowed.", Show: true });
        } else {
            const getRes = await axios.put('http://localhost:8000/seller/add-new-product', NewItem, { 'headers': { 'Content-Type': 'multipart/form-data' } });
            const res = getRes.data;
            if (res["Status"] === "Success") {
                setAlert({
                    AlertTitle: res["Status"],
                    alertMsg: "Your product is added successfully.",
                    show: true
                });
            } else if (res["Status"] === "Waiting") {
                setAlert({
                    AlertTitle: res["Status"],
                    alertMsg: "Your product details is process.",
                    show: true
                });
            }else if (res["Status"] === "unique") {
                setAlert({
                    AlertTitle: "Warning",
                    alertMsg: "Product Title must be unique from others.",
                    show: true
                });
            }
        }
    }

    return (
        <section className="add-new-item">
            {Alert.show && (<div className="alert alert-success">
                <strong>{Alert.AlertTitle}: </strong>{Alert.alertMsg}
            </div>)}
            <h3 className="text-center my-4">Add New Product</h3>
            <div className="note w-50 text-danger">{note.Show && (note.Note)}</div>

            <div className="add-item-form d-flex justify-content-center">
                <form method="post" className="w-75" onSubmit={handleSubmit} encType="multipart/form-data">
                    <input type="file" name="item-pic" className="form-control border-primary" onChange={handleImage} required />
                    <input type="text" name="item-title" className="item-title form-control my-4 border-primary" placeholder="Item Title Here..." onChange={handleChange} required />
                    <input type="text" name="item-price" className="item-description form-control border-primary" placeholder="Item MRP Price..." onChange={handleChange} required />
                    <input type="text" name="item-discount" className="item-discount form-control my-4 border-primary" placeholder="Item Discount eg: 12" onChange={handleChange} required />
                    <input type="text" name="item-qty" className="item-qty form-control my-4 border-primary" placeholder="Item Quantity..." onChange={handleChange} required />
                    <textarea name="item-description" className="form-control border-primary" placeholder="Item Description Here..." onChange={handleChange} required ></textarea>
                    <select name="item-category" className="form-select my-4 border-primary" onChange={handleChange} required>
                    <option value="">---Choose Category---</option>
                        <option value="Plants">Plant</option>
                        <option value="Trees">Tree</option>
                        <option value="Seeds">Seeds</option>
                        <option value="Pots">Pots</option>
                        <option value="Fertilizers">Fertilizers</option>
                        <option value="Gardening">Gardening</option>
                        <option value="Corporate">Corporate</option>
                    </select>
                    <button type="submit" className="btn btn-primary my-4">Add New</button>
                </form>
            </div>
        </section>
    )
}