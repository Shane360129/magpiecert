import React from 'react';
import Hero from '../../components/Hero';
import AboutUs from '../../components/AboutUs';
import Advantages from '../../components/Advantages';
import Services from '../../components/Services';
import HomeCourses from '../../components/HomeCourses';
import CtaBanner from '../../components/CtaBanner';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <AboutUs />
      <Advantages />
      <Services />
      <HomeCourses />
      <CtaBanner />
    </>
  );
};

export default Home;
