import React from 'react'
import "./Header.css"
import { categoryData } from '../../services/category-service'
import { LOGO_TITLE, USERNAME } from '../../constants/constants';

const Header = () => {
    console.log(categoryData);
  return (
    <section className='header'>            
        <h4>{LOGO_TITLE}</h4>
        <ul>
            {categoryData.map((item) => {
                return <li key={item.id} value={item.category}>{item.category.toUpperCase()}</li>  
            })}
        </ul>
        <p className='user-name'>{USERNAME}</p>
    </section>
  )
}

export default Header;