import React from 'react'



import './SnackItem.css'
import palomitasImg from '../img/Palomitas.webp'

export default function SnackItem({infoSnack: {nombresnack, precio}}) {
  return (
    <section className='CardSnack'>
      <div className='CardImage'><img src={palomitasImg} alt='Snack item' /></div>
      <div className='CardInfo'>
        <h3 className='CardTitle'>{nombresnack}</h3>
        <p className='PrecioSnack'>${precio}</p>
        
        <button className='CardBtn'>Comprar</button>
        
      </div>


    </section>
  )
}
