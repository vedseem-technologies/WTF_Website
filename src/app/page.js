import React from 'react'
import Header from '../components/sections/Header'
import Hero from '../components/sections/Hero'
import Carousel from '../components/sections/Carousel'
import PopularItems from '../components/sections/Popular-items'
import Footer from '../components/sections/Footer'
import Banner from '../components/sections/Banner'

function page() {
  return (
    <div className='overflow-x-hidden'>
      <Header />
      <Hero />
      <Carousel />
      <PopularItems />
      <Banner />
      <Footer />
    </div>
  )
}

export default page