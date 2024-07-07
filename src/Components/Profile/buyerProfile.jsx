import React, { useReducer, useState } from "react";
import img from '../../static/tree2.jpg';
import './admin.css';
import axios from "axios";

const formReducer = (state, event) => {
    return ({
        ...state,
        [event.name]: event.value
    });
}

export default function Profile() {
    const [form_data, setFormData] = useReducer(formReducer, {});
    const [userDetails, setUser] = useState({usericon: ""});

    const handleChange = (e) => {
        setFormData({
            "name": e.target.name,
            "value": e.target.value
        });
    }
    const handleImageChange = (e) => {
        setUser({...userDetails, usericon: e.target.files[0]});
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
        formData.append('icon', userDetails.usericon);
        console.log(userDetails.usericon);
        
        const updateDetails = await axios.post('http://localhost:8000/user/user-record', formData);
    }

    return (
        <section className="userprofile">
            <h1 className="text-center mt-3">Welcome Jayesh</h1>
            <div className="profile-layout w-75 m-auto d-flex mt-5">
                <div className="profile-img w-25">
                    <img src={img} alt="" width="200px" height="180px" />
                </div>
                <div className="profile-update-form w-75">
                    <form method="post" className="form" onSubmit={handleSubmit} encType="multipart/form-data">
                        <input type="file" name="user-icon" id="user-icon" accept=".jpeg .jpg .png" className="form-control mb-4" onChange={handleImageChange} />
                        <input type="text" name="user-name" id="user-name" className="form-control mb-4" onChange={handleChange} placeholder="Username: Jayesh Malviya" />
                        <input type="email" name="user-email" id="user-email" className="form-control mb-4" onChange={handleChange} placeholder="Useremail: Jayesh@gmail.com" />
                        <input type="text" name="user-phone" id="user-phone" className="form-control mb-4" onChange={handleChange} placeholder="Phone: 88*******5" />
                        <input type="text" name="user-address" id="user-address" className="form-control mb-4" onChange={handleChange} placeholder="Address: Adarsh Nagar, S. S. Udaipur" />
                        <input type="text" name="user-city" id="user-city" className="form-control mb-4" onChange={handleChange} placeholder="City: Udaipur" />
                        <input type="text" name="user-state" id="user-state" className="form-control mb-4" onChange={handleChange} placeholder="State: Rajasthan" />
                        <input type="text" name="user-pin" id="user-pin" className="form-control mb-4" onChange={handleChange} placeholder="State: 313001" />
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
        </section>
    )
}