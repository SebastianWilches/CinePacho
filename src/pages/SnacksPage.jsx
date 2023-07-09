import React, { useContext, useEffect, useState } from 'react'
import { DotSpinner } from '@uiball/loaders'
import SnackItem from '../components/SnackItem'
import Footer from '../components/Footer'

import './SnacksPage.css'
import { CineContext } from '../context/CineContext'

export const SnacksPage = () => {

  const urlBase = 'https://cinepachoapi.azurewebsites.net/';
  const [snacks, setSnacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedMultiplex_ID } = useContext(CineContext);
  

  useEffect(() => {
    GET_Snacks(selectedMultiplex_ID);
  }, [])

  const GET_Snacks = async (idMultiplex = 1) => {
    const response = await fetch(`${urlBase}listaSnackMultiplex/${idMultiplex}`);
    const { listarSnacksM } = await response.json();

    setSnacks(listarSnacksM);
    setLoading(false)
  }

  return (
    <>
      <article className='container'>
        <h2 className='title-container'>Deléitate con nuestros irresistibles snacks:<br></br> ¡La combinación perfecta para disfrutar de cada película!</h2>
        <div className="container-snacks">
          {
            loading ?
              (<DotSpinner
                size={40}
                speed={0.9}
                color="black"
              />)
              :
              (snacks.map((snack, index) => {
                return <SnackItem infoSnack={snack} key={index}/>
              }))
          }
        </div>

      </article>

      <Footer />
    </>
  )
}
