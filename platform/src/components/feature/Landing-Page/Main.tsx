import React from 'react';
import MainHero from './MainHero';
import BodyDescription from './BodyDescription';
import Details from './Details';
import Testimonials from './Testimonials';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <>
      <MainHero />
      <BodyDescription />
      <Details />
      <Testimonials />
      <Footer />
    </>
  );
};

export default LandingPage;
