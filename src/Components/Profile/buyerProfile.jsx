import React from "react";
import img from '../../static/tree2.jpg';
import './admin.css';

export default function Profile() {
    return (
        <section className="userprofile">
            <h1 className="text-center mt-3">Welcome Jayesh</h1>
            <div className="profile-layout w-75 m-auto d-flex mt-5">
                <div className="profile-img w-25">
                    <img src={img} alt="" width="200px" height="180px" />
                </div>
                <div className="profile-update-form w-75">
                    <form method="post" className="form">
                        <input type="file" name="user-icon" id="user-icon" className="form-control mb-4" />
                        <input type="text" name="user-name" id="user-name" className="form-control mb-4" placeholder="Username: Jayesh Malviya" />
                        <input type="email" name="user-email" id="user-email" className="form-control mb-4" placeholder="Useremail: Jayesh@gmail.com" />
                        <input type="text" name="user-phone" id="user-phone" className="form-control mb-4" placeholder="Phone: 88*******5" />
                        <input type="text" name="user-address" id="user-address" className="form-control mb-4" placeholder="Address: Adarsh Nagar, S. S. Udaipur" />
                        <input type="text" name="user-city" id="user-city" className="form-control mb-4" placeholder="City: Udaipur" />
                        <input type="text" name="user-state" id="user-state" className="form-control mb-4" placeholder="State: Rajasthan" />
                        <input type="text" name="user-pin" id="user-pin" className="form-control mb-4" placeholder="State: 313001" />
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
        </section>
    )
}