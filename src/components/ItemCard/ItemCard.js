import React, { useEffect, useState } from 'react';
import './ItemCard.css';
import { formattedPrice, handleImageError } from '../../utils/common-utils';
import { ADD_TO_CART_BUTTON, DECREASE_CART_QUANTITY, INCREASE_CART_QUANTITY, MY_CART_TITLE, MY_WISHLIST_TITLE, RUPEE_SYMBOL } from '../../constants/constants';

const ItemCard = ({ item, type, removeItemFromCart, updateQuantityInLocalStorage, addWishlistItemToCart }) => {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity])

  /**
   * Increase quantity of item in cart
   */
  const increaseQuantity = () => {
    try {
      const updatedQuantity = quantity + 1;
      setQuantity(updatedQuantity);
      updateQuantityInLocalStorage(updatedQuantity, item);
    } catch (error) {
      console.error('Error increasing quantity:', error);
    }
  };

  /**
   * Decrease quantity of item in cart
   */
  const decreaseQuantity = () => {
    try {
      if (quantity > 1) {
        const updatedQuantity = quantity - 1;
        setQuantity(updatedQuantity);
        updateQuantityInLocalStorage(updatedQuantity, item);
      } else {
        removeItemFromCart(item.id);
      }
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };


  return (
    <div className='item-card'>
      <img src={item.photo} alt={item.name} onError={handleImageError} className='item-image' />

      <div className='item-details'>
        <p>{item.name}</p>
        <p>{RUPEE_SYMBOL} {formattedPrice(item.price)}</p>

        { type === MY_CART_TITLE && <div className='quantity-container'>
          <p onClick={decreaseQuantity}> {DECREASE_CART_QUANTITY} </p>
          <p>{quantity}</p>
          <p onClick={increaseQuantity}> {INCREASE_CART_QUANTITY}</p>
        </div>}

        { type === MY_WISHLIST_TITLE && <button className='add-to-cart-button' onClick={() => addWishlistItemToCart()}>{ADD_TO_CART_BUTTON}</button>}
      </div>
    </div>
  );
};

export default ItemCard;
