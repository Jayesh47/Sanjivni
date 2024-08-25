import React, { useEffect, useReducer, useState } from "react";
import './admin.css';
import axios from "axios";
import { text } from "body-parser";

const formReducer = (state, event) => {
    return ({
        ...state,
        [event.name]: event.value
    });
}

export default function Profile() {
    const [form_data, setFormData] = useReducer(formReducer, {});
    const [userDetails, setUser] = useState({ usericon: "" });
    const [retrieve, setRetreive] = useState({ "name": "", imgs: "", phone: "", mail: "", adrs: "", city: "", state: "", pin: "" });
    const [Alert, setAlert] = useState({
        AlertTitle: "",
        alertMsg: "",
        show: false
    });
    const token = localStorage.getItem('token');
    const handleRetrival = async () => {
        try {
            const details = await axios.get('http://localhost:8000/user/user-details', { 'headers': { 'Authorization': `Bearer ${token}` } });
            const response = details.data;
            if (response["city"] && response["adrs"]) {
                console.log(response["userImg"]);
                setRetreive({
                    name: response["username"].toUpperCase(),
                    imgs: response["userImg"],
                    phone: response["userphone"],
                    mail: response["useremail"],
                    adrs: response["adrs"].toUpperCase(),
                    city: response["city"].split(',')[0].toUpperCase(),
                    state: response["city"].split(',')[1].toUpperCase(),
                    pin: response["userpin"]
                });
            }else {
                setRetreive({
                    name: response["username"],
                    mail: response["useremail"]
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        handleRetrival();
    }, []);

    const handleChange = (e) => {
        setFormData({
            "name": e.target.name,
            "value": e.target.value
        });
    }

    const handleImageChange = (e) => {
        setUser({ ...userDetails, usericon: e.target.files[0] });
        console.log(userDetails.usericon);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', form_data["user-name"]);
        formData.append('email', form_data["user-email"]);
        formData.append('phone', form_data["user-phone"]);
        formData.append('address', form_data["user-address"]);
        formData.append('city', form_data["user-city"]);
        formData.append('state', form_data["user-state"]);
        formData.append('pin', form_data["user-pin"]);
        formData.append('user-icon', userDetails.usericon);
        formData.append('token', token);

        const updateDetails = await axios.post('http://localhost:8000/user/user-record', formData, { headers: { 'Content-Type': "multipart/form-data" } });
        const response = updateDetails.data;

        if (response["status"] === "Success") {
            setAlert({
                AlertTitle: "Success",
                alertMsg: "Your details are successfully updated!",
                show: true
            });
        } else if (response["message"] === "Token Expired!" && response["message"] === "Invalid token!") {
            window.location.href = "/logout";
        } else {
            setAlert({
                AlertTitle: "Warning",
                alertMsg: "Wait your data will be proceed, try again later!",
                show: true
            });
        }
    }

    return (
        <section className="userprofile">
            {
                Alert.show && <div className="alert alert-success">
                    <strong>{Alert.AlertTitle}: </strong><span>{Alert.alertMsg}</span>
                </div>
            }
            <h3 className="text-center mt-3">WELCOME {retrieve.name}</h3>
            <div className="profile-layout w-75 m-auto d-flex mt-5">
                <div className="profile-img w-25">
                    <img src={"http://localhost:8000/upload/" + retrieve["imgs"]} alt="" width="200px" height="180px" />
                </div>
                <div className="profile-update-form w-75">
                    <form method="post" className="form" onSubmit={handleSubmit} encType="multipart/form-data">
                        <input type="file" name="user-icon" id="user-icon" className="form-control mb-4" onChange={handleImageChange} defaultValue={retrieve.imgs} />
                        <input type="text" name="user-name" id="user-name" className="form-control mb-4" onChange={handleChange} placeholder="Username" defaultValue={retrieve.name} />
                        <input type="email" name="user-email" id="user-email" className="form-control mb-4" onChange={handleChange} placeholder="Useremail" defaultValue={retrieve.mail} />
                        <input type="text" name="user-phone" id="user-phone" className="form-control mb-4" onChange={handleChange} placeholder="Phone" defaultValue={retrieve.phone} />
                        <input type="text" name="user-address" id="user-address" className="form-control mb-4" onChange={handleChange} placeholder="Address" defaultValue={retrieve.adrs} />
                        <input type="text" name="user-city" id="user-city" className="form-control mb-4" onChange={handleChange} placeholder="City" defaultValue={retrieve.city} />
                        <input type="text" name="user-state" id="user-state" className="form-control mb-4" onChange={handleChange} placeholder="State" defaultValue={retrieve.state} />
                        <input type="text" name="user-pin" id="user-pin" className="form-control mb-4" onChange={handleChange} placeholder="Pin-Code" defaultValue={retrieve.pin} />
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </section>
    )
}