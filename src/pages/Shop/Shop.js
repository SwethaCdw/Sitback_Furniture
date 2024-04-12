import React, { useState } from 'react';
import { fetchProductsByCategory } from '../../services/category-service';
import Card from '../../components/Card/Card';
import './Shop.css';
import { useParams } from 'react-router-dom';
import Cart from '../../components/Cart/Cart';


const Shop = () => {
    const { categoryId } = useParams();
    const [ productData, setProductData ] = useState([]);

    fetchProductsByCategory(categoryId.toLowerCase())
    .then(data => {
        if (data) {
            setProductData(data);
        }
    })
    .catch(error => {
        console.error('Error fetching products by category:', error);
    });

  return (
        <div className='shop-page-container'>
            <div className='shop-card-container-wrapper'>
                {productData.map((item) => {
                    return <Card key={item.id} title={item.name} desc={item.description} imageSource={item.photo}  productGuarantee={item.guarantee}  productPrice={item.price}/>
                })}
            </div>
            <Cart />
        </div>
  )
}
export default Shop;
