import React from "react";
import { formattedPrice, handleImageError } from "../../utils/common-utils";
import { ADD_TO_CART_BUTTON, ADD_TO_WISHLIST_BUTTON, GUARANTEE, QUANTITY_LABEL, RUPEE_SYMBOL, SHOP_NOW_BUTTON, YEAR, YEARS } from "../../constants/constants";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ title, desc, imageSource, productPrice, productGuarantee, productQuantity, onAddToWishlist, onAddToCart}) => {
  return (
    <div className='card-container'>
      <img src={imageSource} onError={handleImageError} alt="Product" ></img>
      <div className="title-container">
        <p className='title'>{title}</p>
        { productPrice && <p className="product-price">{RUPEE_SYMBOL} {formattedPrice(productPrice)}</p> }
      </div>

      {productQuantity && <p className="product-quantity">{QUANTITY_LABEL}{productQuantity}</p>}
     
      <p className="description">{desc}</p>
      { productGuarantee && 
        <>
          <div className="product-guarantee">
            <i className="fi fi-sr-shield-check"></i>
            <p>{productGuarantee > 1 ? `${productGuarantee} ${YEARS} ${GUARANTEE}` : `${productGuarantee} ${YEAR} ${GUARANTEE}`}</p>
          </div>
          <div className="product-buttons">
            <button className="wishlist-button" onClick={() => onAddToWishlist()}>{ADD_TO_WISHLIST_BUTTON}</button>
            <button className="cart-button" onClick={() => onAddToCart()}>{ADD_TO_CART_BUTTON}</button>
          </div>
        </>
      }
      {!productPrice && <Link to={`/categories/${title.toLowerCase()}`}><button className="shop-now-button" >{SHOP_NOW_BUTTON}</button></Link>}
    </div>
  )
}

export default Card;