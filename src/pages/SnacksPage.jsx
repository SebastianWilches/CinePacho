import React, { useEffect, useState } from 'react'
import { DotSpinner } from '@uiball/loaders'
import SnackItem from '../components/SnackItem'
import Footer from '../components/Footer'

import './SnacksPage.css'

export const SnacksPage = () => {

  const urlBase = 'http://localhost:3001/';
  const [snacks, setSnacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GET_Snacks();
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
                return <SnackItem infoSnack={snack} key={index} />
              }))
          }
        </div>

      </article>

      <Footer />
    </>
  )
}
