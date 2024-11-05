import React from 'react'
import Header from '../components/Header/Header';
import HeroSection from '../components/HeroSection/HeroSection';
import SearchBar from '../Shared/SearchBar';
import ServiceList from '../Shared/ServiceList';
import FeautureTourList from '../components/FeautureTourList/FeautureTourList';


function Home() {
  return <>
  <Header />
  <HeroSection />
  <SearchBar/>
  <ServiceList/>
  <FeautureTourList/>
  </>
}

export default Home;