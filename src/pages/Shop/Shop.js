import React, { useEffect, useState } from 'react';
import { fetchProductsByCategory } from '../../services/category-service';
import Card from '../../components/Card/Card';
import { useParams } from 'react-router-dom';
import Cart from '../../components/Cart/Cart';
import { getItemFromLocalStorage, setItemInLocalStorage } from '../../utils/local-storage-utils';
import { addItemToCartOrWishlist, calculateTotalCartPrice } from '../../utils/cart-utils';
import Header from '../../components/Header/Header';
import './Shop.css';

const Shop = () => {
    const { categoryId } = useParams();
    const [ productData, setProductData ] = useState([]);
    const [ cartItems, setCartItems ]= useState([]);
    const [ wishlistItems, setWishlistItems ] = useState([])
    const [ totalCartPrice, setTotalCartPrice ] = useState(0);

    useEffect(() => {
      const totalPrice = getItemFromLocalStorage('totalCartPrice');
      setTotalCartPrice(totalPrice);

      const existingCartItems = JSON.parse(getItemFromLocalStorage('cartItems')) || [];
      setCartItems(existingCartItems);

      const existingWishlistItems = JSON.parse(getItemFromLocalStorage('wishlist')) || [];
      setWishlistItems(existingWishlistItems);

      document.body.classList.add('disable-scroll');

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
        document.body.classList.remove('disable-scroll');
      };
    }, [categoryId]);

    const handleAddToCart = (productItem) => {
      const cartItems = addItemToCartOrWishlist(productItem, 'cartItems');
      setCartItems(cartItems);

      const totalPrice = calculateTotalCartPrice();
      setTotalCartPrice(totalPrice);
      setItemInLocalStorage('totalCartPrice', totalPrice);

    };

    const handleAddToWishlist = (productItem) => {
        const wishlistItems = addItemToCartOrWishlist(productItem, 'wishlist');
        setWishlistItems(wishlistItems);
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
            {(cartItems.length > 0 || wishlistItems.length > 0) && <Cart cartItems={cartItems} wishlistItems={wishlistItems} cartKey={cartItems.length} wishlistKey={wishlistItems.length} cartPrice={totalCartPrice}/>}
        </div>
    </>
  )
}
export default Shop;
