import React from 'react'

import SnackItem from '../components/SnackItem'
import Footer from '../components/Footer'

import './SnacksPage.css'



import palomitasImg from '../img/Palomitas.webp'
import perroImg from '../img/Perro.webp'
import gaseosaImg from '../img/Gaseosa.jpg'



export const SnacksPage = () => {

  const test = {
    img: palomitasImg,
    title: "Palomitas",
    precio: "$15000"
  }
  const test2 = {
    img: perroImg,
    title: "Perro",
    precio: "$7000"
  }
  const test3 = {
    img: gaseosaImg,
    title: "Gaseosa",
    precio: "$15000"
  }


  return (
    <>
      <article className='container'>
        <h2 className='title-container'>Deléitate con nuestros irresistibles snacks:<br></br> ¡La combinación perfecta para disfrutar de cada película!</h2>
        <div className="container-snacks">
          <SnackItem infoSnack={test}></SnackItem>
          <SnackItem infoSnack={test2}></SnackItem>
          <SnackItem infoSnack={test3}></SnackItem>
          <SnackItem infoSnack={test}></SnackItem>
          <SnackItem infoSnack={test2}></SnackItem>
          <SnackItem infoSnack={test3}></SnackItem>
        </div>

      </article>

      <Footer />
    </>
  )
}
