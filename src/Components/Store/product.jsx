import React from "react";
import { useParams } from "react-router-dom";

export default function Product_View() {
    const {id} = useParams();
    return(
        <h1>Product review of this id: {id}.</h1>
    )
}