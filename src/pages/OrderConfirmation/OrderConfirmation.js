import React, { useState, useEffect } from 'react';
import './OrderConfirmation.css';
import { getItemFromLocalStorage } from '../../utils/local-storage-utils';
import Card from '../../components/Card/Card';
import Header from '../../components/Header/Header';
import Categories from '../../components/Categories/Categories';
import { ORDER_CONFIRMATION_CAPTION, ORDER_CONFIRMATION_TITLE } from '../../constants/constants';

const OrderConfirmation = () => {
    const [orderedItems, setOrderedItems] = useState([]);

    useEffect(() => {
        const storedCartItems = getItemFromLocalStorage('cartItems') || [];
        setOrderedItems(JSON.parse(storedCartItems));
    }, []);

  return (
    <>
        <Header />
        <div className='order-confirmation-page-container'>
            <div className='order-confirmation-wrapper'>
                <h3 className='order-confirmation-title'>{ORDER_CONFIRMATION_TITLE}</h3>
                <p className='order-confirmation-message'>{ORDER_CONFIRMATION_CAPTION}</p>
                <div className='ordered-items'>
                    {orderedItems.map((item) => {
                        return <Card key={item.id} title={item.name} desc={item.description} imageSource={item.photo} productPrice={item.price} productQuantity={item.quantity} />
                    })}
                </div>
            </div>
            <Categories />
        </div>
    </>
   
  )
}
export default OrderConfirmation;
