import React from 'react';
import Hero from './Hero';
import Awards from './Awards';
import Stats from './Stats';  // Don't forget to import Stats
import Pricing from './Pricing';  // Don't forget to import Pricing
import Education from './Education';
import OpenAccount from '../OpenAccount';
import Navbar from '../Navbar';
import Footer from '../Footer';
import LoginPage from '../LoginPage/login';

function HomePage() {
  return ( 
    <>
      
      <Hero />
      <Awards />
      <Stats />
      <Pricing />
      <Education />
      <OpenAccount />
      <login />
      
    </>
  );
}

export default HomePage;
