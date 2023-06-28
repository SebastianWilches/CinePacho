import React from 'react'

import snack from '../img/Palomitas.webp'

import './SnackItem.css'

export default function SnackItem({infoSnack: {img, title, precio}}) {
  return (
    <section className='CardSnack'>
      <div className='CardImage'><img src={img} alt='Snack item' /></div>
      <div className='CardInfo'>
        <h3 className='CardTitle'>{title}</h3>
        <p className='PrecioSnack'>{precio}</p>
        
        <button className='CardBtn'>Comprar</button>
        
      </div>


    </section>
  )
}
