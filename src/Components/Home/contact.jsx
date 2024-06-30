import React from "react";
import contact_img from '../../static/tree3.jpg';

export default function Contact() {
    return (
        <section className="contact mt-5">
            <h1>Contact us</h1>
            <div className="contact-body">
                <div className="contact-img">
                    <img src={contact_img} alt="" width="250px" height="250px" />
                </div>
                <form className="contact-form">
                    <input type="email" name="con-email" id="con-email" placeholder="Contact@email.com" />
                    <textarea name="con-description" rows="3" placeholder="your feedback please."></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </section>
    )
}