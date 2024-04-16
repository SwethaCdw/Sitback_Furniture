import React from 'react';
import './Home.css';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Categories from '../../components/Categories/Categories';

const Home = () => {
  console.log('Home');
  return (
    <>
      <Header />
      <Categories />
      <Footer />
    </>

  )
}
export default Home;
