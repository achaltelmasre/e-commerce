import React from "react";
import "./ProductCard.css";
import { Link } from 'react-router-dom'

const ProductCard = ({id ,name, description, price, image }) => {
    return(
       <>
            <div className="product-card-container ">

                <img src={image} height={200} alt="img" className="product-img"/>
                <h2 className="product-name">{name}</h2>
                <p className="product-description">{description}</p>
                <h3 className="product-price"> ₹ {price} </h3>

                <Link to={`/buy/${id}`} className=" buy-now">Buy Now</Link>

            </div>
       </>
    )
}
export default ProductCard;