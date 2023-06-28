import React from 'react'

import snack from '../img/Palomitas.webp'

import './SnackItem.css'

export default function SnackItem() {
  return (
    <section className='CardSnack'>
      <div className='CardImage'><img src={snack} alt='Snack item' /></div>
      <div className='CardInfo'>
        <h3 className='CardTitle'>Palomitas</h3>
        
        <button className='CardBtn'>Comprar</button>
        
      </div>


    </section>
  )
}
