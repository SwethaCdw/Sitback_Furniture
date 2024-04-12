import { handleImageError } from "../../utils/common-utils";
import "./Card.css";
import { SHOP_NOW_BUTTON } from "../../constants/constants";
import { Link } from "react-router-dom";

const Card = ({ title, desc, imageSource, productPrice, productGuarantee}) => {

  return (
    <div className='card-container'>
      <img src={imageSource} onError={handleImageError} alt="Product" ></img>
      <div className="title-container">
        <p className='title'>{title}</p>
        <p className="product-price">{productPrice}</p>
      </div>
     
      <p className="description"> {desc}</p>
      { productPrice && 
      <>
        <p className="product-guarantee"><i class="fi fi-sr-shield-check"></i>{productGuarantee} YEARS GUARANTEE</p>

        <div className="product-buttons">
          <button className="wishlist-button">ADD TO WISHLIST</button>
          <button className="cart-button">ADD TO CART</button>
        </div>
      </>
      }
      {!productPrice && <Link to={`/categories/${title}`}><button className="read-more-button" >{SHOP_NOW_BUTTON}</button></Link>}
    </div>
  )
}

export default Card;