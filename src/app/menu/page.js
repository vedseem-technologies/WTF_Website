import React from 'react'
import Header from '../../components/sections/Header'
import MenuPage from '../../components/sections/MenuPage'
import Footer from '../../components/sections/Footer'

export const metadata = {
    title: 'Menu - Where\'s The Fork?',
    description: 'Explore our delicious menu items',
}

function Menu() {
    return (
        <div className='overflow-hidden'>
            <Header />
            <MenuPage />
            <Footer />
        </div>
    )
}

export default Menu
