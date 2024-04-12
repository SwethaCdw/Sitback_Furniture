import React from 'react';
import { categoryData } from '../../services/category-service';
import Card from '../../components/Card/Card';
import './Home.css';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <div className='home-page-container'>
        <h1 className='main-title'>Your Home, With Love</h1>
        <h2 className='main-caption'>Come, Choose from millions of products</h2>
        <div className='card-container-wrapper'>
            {categoryData.map((item) => {
                    return <Card key={item.id} title={item.category}  desc={item.description} imageSource={item.photo} imageHeight="550px" />
            })}
        
        </div>
        <Footer />
    </div>
  )
}
export default Home;
