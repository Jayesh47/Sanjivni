import React, { useEffect, useReducer, useState } from "react";
import icon from '../../static/tree1.jpg';
import './admin.css';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function SellerProfile() {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [Icon, setIcon] = useState({ usericon: "" });
    const token = localStorage.getItem('token');
    const [Alert, setAlert] = useState({
        AlertTitle: "",
        alertMsg: "",
        show: ""
    });
    const [details, setDetails] = useState({ name: "", icon: "", phone: "", mail: "", adrs: "", city: "", state: "", pin: "", land: "" });
    const handleRetrival = async () => {
        try {
            const getResp = await axios.post('http://localhost:8000/seller/seller-details', { "token": token });
            const res = getResp.data;
            if (res["SCity"] && res["Street"]) {
                setDetails({
                    name: res["SName"].toUpperCase(), icon: res["SIcon"],
                    phone: res["SPhone"], mail: res["SEmail"],
                    adrs: res["Street"].toUpperCase(), city: res["SCity"].split(",")[0].toUpperCase(),
                    state: res["SCity"].split(',')[1].toUpperCase(), pin: res["SPin"], land: res["SLand"].toUpperCase()
                });
            }else {
                setDetails({
                    name: res["SName"],
                    mail: res["SEmail"]
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => { handleRetrival() }, []);

    const handleChange = (e) => {
        setFormData({
            "name": e.target.name,
            "value": e.target.value
        });
    }
    const handleProfileImage = (e) => {
        setIcon({ ...Icon, usericon: e.target.files[0] });
        console.log(e.target.files[0]);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const SubmitForm = new FormData();
        SubmitForm.append("sellerName", formData["sellerName"]);
        SubmitForm.append("sellerEmail", formData["sellerEmail"]);
        SubmitForm.append("sellerstreet", formData["sellerstreet"]);
        SubmitForm.append("sellercity", formData["sellercity"]);
        SubmitForm.append("sellerstate", formData["sellerstate"]);
        SubmitForm.append("sellerlandmark", formData["sellerlandmark"]);
        SubmitForm.append("sellerpincode", formData["sellerpincode"]);
        SubmitForm.append("sellerphone", formData["sellerphone"]);
        SubmitForm.append("sellerIcon", Icon.usericon);
        SubmitForm.append("token", token);
        console.log(SubmitForm.get("sellerName"));
        const getRes = await axios.put('http://localhost:8000/seller/seller-profile', SubmitForm, { headers: { 'Content-Type': "multipart/form-data" } });
        const res = getRes.data;
        if (res["Status"] === "Success") {
            setAlert({
                AlertTitle: res["Status"],
                alertMsg: "Your data is updated successfully.",
                show: true
            });
        }else {
            setAlert({
                AlertTitle: res["Status"],
                alertMsg: "Your information may update in a time.",
                show: true
            });
        }
    }

    return (
        <section className="seller-profile">
            <h2 className="text-center my-4 text-capitalize">{details.name} DASHBOARD</h2>
            {
                Alert.show && (
                    <div className="alert alert-success">
                        <strong>{Alert.AlertTitle}: </strong> {Alert.alertMsg}
                    </div>
                )
            }
            <div className="d-flex w-75 m-auto">
                <img src={'http://localhost:8000/sellerUpload/' + details.icon} alt="" width={"200px"} height="200px" className="seller-icon" />
                <form method="post" className="form w-75 ms-5" onSubmit={handleSubmit} encType="multipart/form-data">
                    <input type="file" name="sellerIcon" className="profile-name form-control mb-4 border-primary" placeholder="Profile Icon" onChange={handleProfileImage} defaultValue={details.icon} />
                    <input type="text" name="sellerName" className="profile-name form-control border-primary" placeholder="Profile Name" onChange={handleChange} defaultValue={details.name} />
                    <input type="text" name="sellerEmail" className="profile-email form-control my-4 border-primary" placeholder="Profile Email" onChange={handleChange} defaultValue={details.mail} />
                    <input type="text" name="sellerstreet" className="seller-street form-control border-primary" placeholder="Seller Street Address" onChange={handleChange} defaultValue={details.adrs} />
                    <input type="text" name="sellercity" className="seller-city form-control my-4 border-primary" placeholder="Seller City" onChange={handleChange} defaultValue={details.city} />
                    <input type="text" name="sellerstate" className="seller-state form-control border-primary" placeholder="Seller State" onChange={handleChange} defaultValue={details.state} />
                    <input type="text" name="sellerlandmark" className="seller-landmark form-control my-4 border-primary" placeholder="Seller Landmark" onChange={handleChange} defaultValue={details.land} />
                    <input type="text" name="sellerpincode" className="seller-pincode form-control border-primary" placeholder="Seller Pincode" onChange={handleChange} defaultValue={details.pin} />
                    <input type="text" name="sellerphone" className="seller-phone form-control border-primary my-4" placeholder="Seller Phone Number" onChange={handleChange} defaultValue={details.phone} />
                    <button type="submit" className="btn btn-primary fw-bold">Update Details</button>
                    <span className="ms-3"><Link to="/forgot-password" className="btn btn-success fw-bold">Forgot Password</Link></span>
                </form>
            </div>
        </section>
    )
}
const formReducer = (state, event) => {
    return ({
        ...state,
        [event.name]: event.value
    });
}