import React, { useReducer, useState } from "react";
import '../../admin.css';
import logo from '../../../../static/logo.png';
import axios from "axios";

const formReducer = (state, event) => {
    return ({
        ...state,
        [event.name]: event.value
    })
}

export default function Withdarwals({ totalPayments, remaining }) {
    const [formData, setForm] = useReducer(formReducer, {});
    const token = localStorage.getItem("token");
    const [Alert, setAlert] = useState({
        alertTitle: "",
        alertShow: false
    });

    const HandleChange = (e) => {
        setForm({
            "name": e.target.name,
            "value": e.target.value
        })
    }
    const SubmitHandle = async (e) => {
        e.preventDefault();
        const tokens = localStorage.getItem("token");
        formData['tokens'] = tokens;
        if (formData["withdrawalId"].length < 16)
            setAlert({
                alertTitle: "Make sure your Account Number is correct or have 16 digit number.",
                alertShow: true
            });
        else {
            const remainingAmt = totalPayments - formData["withdrawAmt"];
            if (formData["withdrawAmt"] < totalPayments) {
                formData["remainingAmt"] = remainingAmt;
                const _api = await axios.post("http://localhost:8000/seller/transfer-earnings", { data: btoa(btoa(JSON.stringify(formData))) });
                if (_api.data["Success"]) {
                    setAlert({
                        alertTitle: "Your withdrawal is successfully done!",
                        alertShow: true
                    });
                }
            }else {
                setAlert({
                    alertTitle: "Sorry! In-Sufficient Balance.",
                    alertShow: true
                });
            }
        }
    }


    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel"><img src={logo} alt="" width="50px" /> Sanjivni Payments <span style={{ "fontSize": "12px" }}>₹ {remaining}</span></h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form method="post" className="withdrawl-form form w-100" onSubmit={SubmitHandle}>
                            <input type="text" name="withdrawalId" id="withdrawalId" className="form-control my-4" maxLength="16" placeholder="Your Account Number..." onChange={HandleChange} required />
                            <input type="text" name="withdrawAmt" id="withdrawAmt" className="form-control mb-4" placeholder="Your Withdraw Amount (in Rs.)" onChange={HandleChange} required />
                            <hr />
                            <div className="d-flex justify-content-end align-center">
                                {Alert.alertShow && <small className="d-flex w-75">{Alert.alertTitle}</small>}
                                <button type="submit" className="btn btn-primary float-end ms-5">Proceed</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}