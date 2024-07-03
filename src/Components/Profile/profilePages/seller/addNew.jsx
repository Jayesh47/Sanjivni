import React from "react";
import product_img from '../../../../static/plant.jpg';
import "../../admin.css";

export default function AddNewItem() {
    return (
        <section className="add-new-item">
            <h3 className="text-center my-4">Add New Item</h3>
            <div className="add-item-form d-flex justify-content-center">
                <div className="product-img mx-4">
                    <img src={product_img} alt="" width="200px" height="170px" />
                </div>
                <form method="post" className="w-50">
                    <input type="file" name="item-pic" className="form-control border-primary" />
                    <input type="text" name="item-title" className="item-title form-control my-4 border-primary" placeholder="Item Title Here..." />
                    <input type="number" name="item-price" className="item-description form-control border-primary" placeholder="Item Price..." />
                    <input type="number" name="item-discount" className="item-discount form-control my-4 border-primary" placeholder="Item Discount..." />
                    <input type="number" name="item-qty" className="item-qty form-control my-4 border-primary" placeholder="Item Quantity..." />
                    <textarea name="item-description" className="form-control border-primary" placeholder="Item Description Here..."></textarea>
                    <select name="item-category" className="form-select my-4 border-primary">
                        <option value="">---Choose Category---</option>
                        <option value="Plant">Plant</option>
                        <option value="Tree">Tree</option>
                        <option value="Seeds">Seeds</option>
                        <option value="Fertilizers">Fertilizers</option>
                    </select>
                    <button type="submit" className="btn btn-primary my-4">Add New</button>
                </form>
            </div>
        </section>
    )
}