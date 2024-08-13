import React from "react";
import success from '../../static/success.png';

export default function Greet() {
    return (
        <section className="greeting text-center mt-5">
            <span><img src={success} alt="Success" width="200px"  /></span>
            <h1 className="text-danger">Your Payment is Successfully Created, <br />Thanks For Buying.</h1>
        </section>
    )
}