import React, {useState, useEffect} from 'react';
import './Cart.css';
import ItemCard from '../ItemCard/ItemCard';
import { Link } from 'react-router-dom';
import { getItemFromLocalStorage, setItemInLocalStorage } from '../../utils/local-storage-utils';
import { addItemToCartOrWishlist, calculateTotalCartPrice, removeItemFromCart, removeItemFromWishlist } from '../../utils/cart-utils';
import { MY_CART_TITLE, MY_WISHLIST_TITLE, NO_ITEMS, PLACE_ORDER, TOTAL_CART_AMOUNT_LABEL } from '../../constants/constants';
import { formattedPrice } from '../../utils/common-utils';

const Cart = ({cartItems, wishlistItems, cartPrice, activeTab}) => {
  console.log(activeTab);

  const [totalCartPrice, setTotalCartPrice ] = useState(0);
  const [cartItemsInShop, setCartItemsInShop] = useState([]);
  const [wishlistItemsInShop, setWishlistItemsInShop ] = useState([]);
  const [currentTab, setCurrentTab] = useState('');

  // Update state when props change
  useEffect(() => {
    setTotalCartPrice(cartPrice);
    setCartItemsInShop(cartItems);
    setWishlistItemsInShop(wishlistItems);
    setCurrentTab(activeTab);
  }, [cartPrice, cartItems, wishlistItems, activeTab])


  /**
   * Function to handle tab change
   * @param {*} tab 
   */
  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  /**
   * Delete item from cart and set cart items to its state
   * @param {*} itemId 
   */
  const handleItemDeletion = (itemId) => {
    try {
      const updatedCartItems = removeItemFromCart(itemId);
      setCartItemsInShop(updatedCartItems);
      const totalPrice = calculateTotalCartPrice();
      setTotalCartPrice(totalPrice);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  /**
   * Update Quantity based on increase/decrease in cart component
   * @param {*} updatedQuantity 
   * @param {*} item 
   */
  const updateQuantity = (updatedQuantity, item) => {
    try {
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
    } catch (error) {
      console.error('Error updating quantity in local storage:', error);
    }
  };

  /**
   * Add wishlist item to cart
   * @param {*} productItem 
   */
  const addWishlistItemToCart = (productItem) => {
    try {
      const selectedItem = wishlistItemsInShop.find(item => item.id === productItem.id);
      const cartItems =  addItemToCartOrWishlist(selectedItem, 'cartItems');
      setCartItemsInShop(cartItems);

      const updatedWishlistItems = removeItemFromWishlist(productItem);
      setWishlistItemsInShop(updatedWishlistItems);
      
      const totalPrice = calculateTotalCartPrice();
      setTotalCartPrice(totalPrice);
      setCurrentTab(MY_CART_TITLE);
    } catch (error) {
      console.error('Error adding wishlist item to cart:', error);
    }
  }

  return (
    <div className='cart-container'>
      {/* Tab buttons */}
      <div>
        <button className={`tab ${currentTab === MY_CART_TITLE ? 'active' : ''}`} onClick={() => handleTabChange(MY_CART_TITLE)}>{MY_CART_TITLE}</button>
        <button className={`tab ${currentTab === MY_WISHLIST_TITLE ? 'active' : ''}`} onClick={() => handleTabChange(MY_WISHLIST_TITLE)}>{MY_WISHLIST_TITLE}</button>
      </div>
      
      {/* Content based on active tab */}
      {currentTab === MY_CART_TITLE && (
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
                    updateQuantityInLocalStorage={updateQuantity}
                  />
                ))}
              </ul>
              <div className='place-order'>
                <div className='total-price'>
                  <p className='total-amount-label'>{TOTAL_CART_AMOUNT_LABEL}</p>
                  <p className='total-amount-value'>{formattedPrice(totalCartPrice)}</p>
                </div>
                <Link to={`/confirmOrder`}><button className='place-order-button'>{PLACE_ORDER}</button></Link>
              </div>
            </>
          )}
        </div>
      )}
      {currentTab === MY_WISHLIST_TITLE && (
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