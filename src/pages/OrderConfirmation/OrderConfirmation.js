import React, { useEffect } from 'react';
import './OrderConfirmation.css';
import Header from '../../components/Header/Header';
import Categories from '../../components/Categories/Categories';
import OrderedItems from '../../components/OrderedItems/OrderedItems';
import { removeItemFromLocalStorage } from '../../utils/local-storage-utils';

const OrderConfirmation = () => {    

    //Remove Cart items and price from local storage
    useEffect(() => {
        return(() => {
            removeItemFromLocalStorage('cartItems');
        })
    }, []);

  return (
    <>
        <Header />
        <OrderedItems />
        <Categories />
    </>
  )
}
export default OrderConfirmation;
