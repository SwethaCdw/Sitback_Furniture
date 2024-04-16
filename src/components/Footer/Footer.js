import React from 'react';
import "./Footer.css";
import { COPYRIGHTS } from '../../constants/constants';


const Footer = () => {
  return (
    <section className='footer'>            
       <p>{COPYRIGHTS}</p>
    </section>
  )
}

export default Footer;