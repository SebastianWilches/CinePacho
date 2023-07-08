import React from 'react'



import './SnackItem.css'
import palomitasImg from '../img/Palomitas.webp'

export default function SnackItem({ infoSnack, selectedSnacks, setSelectedSnacks }) {
  const seleccionarSnacks = () => {
    setSelectedSnacks(selectedSnacks => selectedSnacks.concat(infoSnack));
    console.log(selectedSnacks);
  }

  return (
    <section className='CardSnack'>
      <div className='CardImage'><img src={infoSnack.direccionFoto} alt='Snack item' /></div>
      <div className='CardInfo'>
        <h3 className='CardTitle'>{infoSnack.nombresnack}</h3>
        <p className='PrecioSnack'>${infoSnack.precio}</p>

        <button className='CardBtn' onClick={seleccionarSnacks}>Comprar</button>

      </div>


    </section>
  )
}
