import React from "react";
import icon from '../../static/logo.png';

export default function UserComment() {
    return (
        <section className="user-comments m-5">
            <div className="comment-heading">
                <h4>Comments (Count: 2)</h4>
                <div className="write-comment">
                    <textarea name="comment" className="form-control" placeholder="Write Your Review Here."></textarea>
                    <button type="submit" className="btn btn-primary mt-2">Send <i className="fa fa-paper-plane"></i></button>
                </div>
            </div>
            <div className="comment mt-4 d-flex">
                <div className="icon me-4">
                    <img src={icon} alt="" width="50px" />
                </div>
                <div>
                    <b>Jayesh Malviya</b>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia beatae voluptatibus quasi molestias quas aut quibusdam officia vitae, quaerat reprehenderit.</p>
                </div>
            </div>
        </section>
    )
}