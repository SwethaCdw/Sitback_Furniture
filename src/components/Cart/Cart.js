import React, {useState, useEffect} from 'react';
import './Cart.css';
import ItemCard from '../ItemCard/ItemCard';
import { Link } from 'react-router-dom';
import { getItemFromLocalStorage, setItemInLocalStorage } from '../../utils/local-storage-utils';
import { addItemToCartOrWishlist, calculateTotalCartPrice, removeItemFromCart, removeItemFromWishlist } from '../../utils/cart-utils';
import { MY_CART_TITLE, MY_WISHLIST_TITLE, NO_ITEMS, PLACE_ORDER, TOTAL_CART_AMOUNT_LABEL } from '../../constants/constants';

const Cart = ({cartItems, wishlistItems, cartPrice}) => {

  const [totalCartPrice, setTotalCartPrice ] = useState(0);
  const [cartItemsInShop, setCartItemsInShop] = useState([]);
  const [wishlistItemsInShop, setWishlistItemsInShop ] = useState([]);
  const [activeTab, setActiveTab] = useState(MY_CART_TITLE);

  useEffect(() => {
    setTotalCartPrice(cartPrice);
    setCartItemsInShop(cartItems);
    setWishlistItemsInShop(wishlistItems);
  }, [cartPrice, cartItems, wishlistItems])


  // Function to handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleItemDeletion = (itemId) => {
    const updatedCartItems = removeItemFromCart(itemId);
    setCartItemsInShop(updatedCartItems);
    const totalPrice = calculateTotalCartPrice();
    setTotalCartPrice(totalPrice);
  };

  const updateQuantityInLocalStorage = (updatedQuantity, item) => {
    const cartItems = JSON.parse(getItemFromLocalStorage('cartItems')) || [];
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        const totalPrice = parseFloat(cartItem.price) * updatedQuantity;
        return { ...cartItem, quantity: updatedQuantity, totalPrice: totalPrice.toFixed(2) };
      }
      return cartItem;
    });
    setItemInLocalStorage('cartItems', JSON.stringify(updatedCartItems));
    setCartItemsInShop(updatedCartItems);

    const totalPrice = calculateTotalCartPrice();
    setTotalCartPrice(totalPrice);
  };

  const addWishlistItemToCart = (productItem) => {
    const selectedItem = wishlistItemsInShop.find(item => item.id === productItem.id);
    const cartItems =  addItemToCartOrWishlist(selectedItem, 'cartItems');
    setCartItemsInShop(cartItems);

    const updatedWishlistItems = removeItemFromWishlist(productItem);
    setWishlistItemsInShop(updatedWishlistItems);
    
    const totalPrice = calculateTotalCartPrice();
    setTotalCartPrice(totalPrice);
    
  }

  return (
    <div className='cart-container'>
      {/* Tab buttons */}
      <div>
        <button className={`tab ${activeTab === MY_CART_TITLE ? 'active' : ''}`} onClick={() => handleTabChange(MY_CART_TITLE)}>{MY_CART_TITLE}</button>
        <button className={`tab ${activeTab === MY_WISHLIST_TITLE ? 'active' : ''}`} onClick={() => handleTabChange(MY_WISHLIST_TITLE)}>{MY_WISHLIST_TITLE}</button>
      </div>
      
      {/* Content based on active tab */}
      {activeTab === MY_CART_TITLE && (
        <div>
          {cartItemsInShop.length === 0 ? (
            <p className='no-items'>{NO_ITEMS}</p>
          ) : (
            <>
              <ul>
                {cartItemsInShop.map(item => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    type={MY_CART_TITLE}
                    removeItemFromCart={handleItemDeletion}
                    updateQuantityInLocalStorage={updateQuantityInLocalStorage}
                  />
                ))}
              </ul>
              <div className='place-order'>
                <div className='total-price'>
                  <p className='total-amount-label'>{TOTAL_CART_AMOUNT_LABEL}</p>
                  <p className='total-amount-value'>{totalCartPrice}</p>
                </div>
                <Link to={`/confirmOrder`}><button  className='place-order-button'>{PLACE_ORDER}</button></Link>
              </div>
            </>
          )}
        </div>
      )}
      {activeTab === MY_WISHLIST_TITLE && (
        <div>
          {wishlistItemsInShop.length === 0 ? (
            <p className='no-items'>{NO_ITEMS}</p>
          ) : (
            <ul>
              {wishlistItemsInShop.map(item => (
                <ItemCard
                  key={item.id}
                  item={item}
                  type={MY_WISHLIST_TITLE}
                  addWishlistItemToCart={() => addWishlistItemToCart(item)}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;