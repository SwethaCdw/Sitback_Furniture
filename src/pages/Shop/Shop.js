import React, { useEffect, useState } from 'react';
import { fetchProductsByCategory } from '../../services/category-service';
import Card from '../../components/Card/Card';
import { useParams } from 'react-router-dom';
import Cart from '../../components/Cart/Cart';
import { getItemFromLocalStorage, setItemInLocalStorage } from '../../utils/local-storage-utils';
import { addItemToCartOrWishlist, calculateTotalCartPrice } from '../../utils/cart-utils';
import Header from '../../components/Header/Header';
import './Shop.css';
import { MY_CART_TITLE, MY_WISHLIST_TITLE } from '../../constants/constants';

const Shop = () => {
    const { categoryId } = useParams();
    const [ productData, setProductData ] = useState([]);
    const [ cartItems, setCartItems ]= useState([]);
    const [ wishlistItems, setWishlistItems ] = useState([])
    const [ totalCartPrice, setTotalCartPrice ] = useState(0);
    const [ activeTab, setActiveTab ] = useState(MY_CART_TITLE);

    useEffect(() => {
      try {
        // Retrieve total cart price from local storage
        const totalPrice = getItemFromLocalStorage('totalCartPrice');
        setTotalCartPrice(totalPrice);

        // Retrieve existing cart items from local storage
        const existingCartItems = JSON.parse(getItemFromLocalStorage('cartItems')) || [];
        setCartItems(existingCartItems);

        // Retrieve existing wishlist items from local storage
        const existingWishlistItems = JSON.parse(getItemFromLocalStorage('wishlist')) || [];
        setWishlistItems(existingWishlistItems);

        // Disable scroll on body while fetching data
        document.body.classList.add('disable-scroll');

        // Fetch products by category
        fetchProductsByCategory(categoryId.toLowerCase())
        .then(data => {
            if (data) {
                setProductData(data);
            }
        })
        .catch(error => {
            console.error('Error fetching products by category:', error);
        });

        return () => {
          // Re-enable scroll on body when component unmounts
          document.body.classList.remove('disable-scroll');
        };
      } catch (error) {
        console.error('Error in useEffect:', error);
      }
    }, [categoryId]);

    /**
     * Function to handle adding an item to cart
     * @param {*} productItem 
     */
    const handleAddToCart = (productItem) => {
      try {
        // Add item to cart
        const cartItems = addItemToCartOrWishlist(productItem, 'cartItems');
        setCartItems(cartItems);

        // Calculate and set total cart price
        const totalPrice = calculateTotalCartPrice();
        setTotalCartPrice(totalPrice);
        setItemInLocalStorage('totalCartPrice', totalPrice);
        setActiveTab(MY_CART_TITLE);
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    };

    /**
     * Function to handle adding an item to wishlist
     * @param {*} productItem 
     */
    const handleAddToWishlist = (productItem) => {
      try {
        const wishlistItems = addItemToCartOrWishlist(productItem, 'wishlist');
        setWishlistItems(wishlistItems);
        setActiveTab(MY_WISHLIST_TITLE);
      } catch (error) {
        console.error('Error adding item to wishlist:', error);
      }
    }

  return (
    <>
        <Header />
        <div className='shop-page-container'>
            <div className={`shop-card-container-wrapper ${cartItems.length || wishlistItems.length ? 'open' : ''}`}>
                {productData.map((item) => {
                    return <Card key={item.id} title={item.name} desc={item.description} imageSource={item.photo} productGuarantee={item.guarantee} productPrice={item.price} onAddToCart={() => handleAddToCart(item)} onAddToWishlist={() => handleAddToWishlist(item)}/>
                })}
            </div>
            {(cartItems.length > 0 || wishlistItems.length > 0) && <Cart cartItems={cartItems} wishlistItems={wishlistItems} cartKey={cartItems.length} wishlistKey={wishlistItems.length} cartPrice={totalCartPrice} activeTab={activeTab}/>}
        </div>
    </>
  )
}
export default Shop;
