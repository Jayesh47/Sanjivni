import React, { useEffect, useState } from "react";
import axios from 'axios';
import './store.css';

export default function UserComment({ product }) {
    const [comment, setComment] = useState({});
    const [allComment, setAll] = useState([]);
    const [Alert, setAlert] = useState({
        msg: "",
        show: false
    });
    const handleChange = (e) => {
        setComment({ ...comment, userComment: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        comment["product"] = btoa(product);
        const token = localStorage.getItem("token");
        if (comment["userComment"]) {
            const _api = await axios.put("http://localhost:8000/user/user-comments", comment, { 'headers': { 'Authorization': `Bearer ${token}` } });
            if (_api.data["Success"]) {
                setAlert({
                    msg: "Your comment is successfully sent!",
                    show: true
                });
            }
        } else {
            setAlert({
                msg: "Empty Comment!",
                show: true
            });
        }
    }
    useEffect(() => {
        const fetchComments = async () => {
            const api = await axios.get("http://localhost:8000/user/retrieve-comments", { params: { "product": product } });
            const _data = api.data;
            setAll(_data["Comments"]);
        }
        fetchComments();
    }, []);
    return (
        <section className="user-comments m-5">
            <div className="comment-heading">
                <h4>Comments (Count: {allComment.length})</h4>{Alert.show && <span>{Alert.msg}</span>}
                <form method="post" className="write-comment" onSubmit={handleSubmit}>
                    <textarea name="comment" className="form-control" onChange={handleChange} maxLength="200" minLength={4} placeholder="Write Your Review Here."></textarea>
                    <button type="submit" className="btn btn-secondary mt-2">Send <i className="fa fa-paper-plane"></i></button>
                </form>
            </div>
            {
                allComment.map((comments, i) => (
                    <div className="comment mt-4 d-flex">
                        <div className="icon me-4">
                            <img src={"http://localhost:8000/upload/" + comments.customerIcon} alt="" width="30px" />
                        </div>
                        <div key={i}>
                            <h5>{comments.customer}, <small style={{fontSize: "12px"}}>{new Date(comments.timeStamp).toUTCString()}</small></h5>
                            <p>{comments.comment}</p>
                        </div>
                    </div>
                ))
            }
        </section>
    )
}