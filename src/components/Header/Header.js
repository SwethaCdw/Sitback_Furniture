import React from 'react';
import { categoryData } from '../../services/category-service';
import { LOGO_TITLE, USERNAME } from '../../constants/constants';
import { MdArrowDropDown } from "react-icons/md";
import { Link, NavLink } from 'react-router-dom';
import "./Header.css";

const Header = () => {
  return (
    <section className='header'>            
        <Link to="/">
          <p className='app-logo'>{LOGO_TITLE}</p>
        </Link>
        <ul>
        {categoryData.map((item) => {
                return (
                <NavLink 
                  to={`/categories/${item.category.toLowerCase()}`} 
                  key={item.id}
                  activeClassName="active"
                >
                    <li>{item.category.toUpperCase()}</li>
                </NavLink>
                );
            })}
        </ul>
        <p className='profile-user'>{USERNAME}<MdArrowDropDown /></p>
        
    </section>
  )
}

export default Header;