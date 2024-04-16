import React, { useEffect, useState } from 'react';
import './ItemCard.css';
import { handleImageError } from '../../utils/common-utils';
import { ADD_TO_CART_BUTTON, MY_CART_TITLE, MY_WISHLIST_TITLE, RUPEE_SYMBOL } from '../../constants/constants';

const ItemCard = ({ item, type, removeItemFromCart, updateQuantityInLocalStorage, addWishlistItemToCart }) => {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity])

  const increaseQuantity = () => {
    const updatedQuantity = quantity + 1;
    setQuantity(updatedQuantity);
    updateQuantityInLocalStorage(updatedQuantity, item);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const updatedQuantity = quantity - 1;
      setQuantity(updatedQuantity);
      updateQuantityInLocalStorage(updatedQuantity, item);
    } else {
      removeItemFromCart(item.id);
    }
  };


  return (
    <div className='item-card'>
      <img src={item.photo} alt={item.name} onError={handleImageError} className='item-image' />
      <div className='item-details'>
        <p>{item.name}</p>
        <p>{RUPEE_SYMBOL} {item.price}</p>
        { type === MY_CART_TITLE && <div className='quantity-container'>
          <p onClick={decreaseQuantity}> - </p>
          <p>{quantity}</p>
          <p onClick={increaseQuantity}> + </p>
        </div>}
        { type === MY_WISHLIST_TITLE && <button className='add-to-cart-button' onClick={() => addWishlistItemToCart()}>{ADD_TO_CART_BUTTON}</button>}
      </div>
    </div>
  );
};

export default ItemCard;
