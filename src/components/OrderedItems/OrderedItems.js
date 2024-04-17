import React, { useState, useEffect } from 'react';
import './OrderedItems.css';
import { getItemFromLocalStorage } from '../../utils/local-storage-utils';
import Card from '../../components/Card/Card';
import { ORDER_CONFIRMATION_CAPTION, ORDER_CONFIRMATION_TITLE } from '../../constants/constants';

const OrderedItems = () => {
    const [orderedItems, setOrderedItems] = useState([]);

    useEffect(() => {
        const storedCartItems = getItemFromLocalStorage('cartItems') || [];
        setOrderedItems(JSON.parse(storedCartItems));
    }, []);

  return (
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
        </div>
  )
}
export default OrderedItems;
