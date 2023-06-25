import React from 'react'

import SnackItem from '../components/SnackItem'
import Footer from '../components/Footer'

import './SnacksPage.css'

export const SnacksPage = () => {
  return (
    <>
    <article className='container'>
    <h2 className='title-container'>Deléitate con nuestros irresistibles snacks:<br></br> ¡La combinación perfecta para disfrutar de cada película!</h2>
    <div className="container-snacks">
    <SnackItem></SnackItem>
    <SnackItem></SnackItem>
    <SnackItem></SnackItem>
    <SnackItem></SnackItem>

    </div>

    </article>
    
    <Footer/>
    </>
  )
}
