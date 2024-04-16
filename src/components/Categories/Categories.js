import React from 'react';
import { categoryData } from '../../services/category-service';
import Card from '../../components/Card/Card';
import './Categories.css';
import { HOME_PAGE_CAPTION, HOME_PAGE_TITLE } from '../../constants/constants';

const Categories = () => {
  return (
    <div className='home-page-container'>
        <h1 className='main-title'>{HOME_PAGE_TITLE}</h1>
        <h2 className='main-caption'>{HOME_PAGE_CAPTION}</h2>
        <div className='card-container-wrapper'>
            {categoryData.map((item) => {
                return <Card key={item.id} title={item.category}  desc={item.description} imageSource={item.photo} />
            })}
        </div>
    </div>
  )
}
export default Categories;
