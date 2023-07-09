import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Modal, Button, Card } from '@rewind-ui/core';
import { useForm } from 'react-hook-form'
import { CineContext } from '../context/CineContext';
import { AiFillStar } from "react-icons/ai";


import './HomePage.css'

// import img from '../../public/Movie.png'
import star from '../img/Star.png'

export const HomePage = () => {

  const { setListaMultiplex, listaMultiplex, setSelectedMultiplex_ID } = useContext(CineContext);
  const urlBase = 'https://cinepachoapi.azurewebsites.net/';
  const { register, handleSubmit } = useForm(); //State del form
  const [open, setOpen] = useState(false); //Modal

  useEffect(() => {
    GET_Multiplex();
    setOpen(true);
  }, []);

  const GET_Multiplex = async () => {
    const response = await fetch(`${urlBase}listarMultiplex`);
    const { listaMultiplex } = await response.json();

    setListaMultiplex(listaMultiplex);
  }


  return (
    <>
      <Header></Header>
      <article className='container'>
        <h2 className='title-container'>¡Encuentra los mejores estrenos aquí!</h2>
        <section>
          <article className='container--FeaturedMovie'>
            <div alt="Poster pelicula destacada" className='imgFeaturedMovie' />
            {/* <img src={img} alt="Poster pelicula destacada" className='imgFeaturedMovie' /> */}
            <div>
              <h3>WALK ALONE</h3>
              <p>“Un exitoso psicólogo llamado David se ve envuelto en una serie de eventos misteriosos después de que una de sus pacientes, Sarah, desaparece sin dejar rastro. A medida que David profundiza en su investigación para encontrarla, comienza a descubrir secretos oscuros y perturbadores sobre la vida de Sarah y la identidad de sus otros pacientes.”</p>
              <div className='container--star'>
                <AiFillStar className='imgStar' />
                <AiFillStar className='imgStar' />
                <AiFillStar className='imgStar' />
                <AiFillStar className='imgStar' />
                <AiFillStar className='imgStar' />
              </div>
            </div>
            <div></div>
          </article>

          <article className='container--FeaturedMovie'>
            <div></div>
            <div>
              <h3>WALK ALONE</h3>
              <p>“Un exitoso psicólogo llamado David se ve envuelto en una serie de eventos misteriosos después de que una de sus pacientes, Sarah, desaparece sin dejar rastro. A medida que David profundiza en su investigación para encontrarla, comienza a descubrir secretos oscuros y perturbadores sobre la vida de Sarah y la identidad de sus otros pacientes.”</p>
              <div className='container--star'>
                <AiFillStar className='imgStar' />
                <AiFillStar className='imgStar' />
                <AiFillStar className='imgStar' />
                <AiFillStar className='imgStar' />
                <AiFillStar className='imgStar' />
              </div>
            </div>
            <div alt="Poster pelicula destacada" className='imgFeaturedMovie' />
            {/* <img src={img} alt="Poster pelicula destacada" className='imgFeaturedMovie' /> */}
          </article>


          <article className='container--FeaturedMovie'>
            <div alt="Poster pelicula destacada" className='imgFeaturedMovie' />
            {/* <img src={img} alt="Poster pelicula destacada" className='imgFeaturedMovie' /> */}
            <div>
              <h3>WALK ALONE</h3>
              <p>“Un exitoso psicólogo llamado David se ve envuelto en una serie de eventos misteriosos después de que una de sus pacientes, Sarah, desaparece sin dejar rastro. A medida que David profundiza en su investigación para encontrarla, comienza a descubrir secretos oscuros y perturbadores sobre la vida de Sarah y la identidad de sus otros pacientes.”</p>
              <div className='container--star'>
                <AiFillStar className='imgStar' />
                <AiFillStar className='imgStar' />
                <AiFillStar className='imgStar' />
                <AiFillStar className='imgStar' />
                <AiFillStar className='imgStar' />
              </div>
            </div>
            <div></div>
          </article>
        </section>
      </article>
      <Footer />


      <Modal closeOnEscape={false} overlayCloseOnClick="false" position="center" size="md" open={open} onClose={() => setOpen(false)}>
        <Card>
          <Card.Header><b>Selecciona tu multiplex</b></Card.Header>
          <Card.Body>
            <form className='container-selectMultiplex' onSubmit={handleSubmit((data) => {
              setSelectedMultiplex_ID(data.selectedMultiplex_ID)
              setOpen(false);
            })}>
              <select {...register("selectedMultiplex_ID", { required: true })}>
                {
                  listaMultiplex.map((multi, index) => {
                    return <option value={multi.multiplex_id} key={index}>{multi.nombreMultiplex}</option>
                  })
                }
              </select>
              <input className='button-submit' type="submit" />
            </form>
          </Card.Body>
        </Card>
      </Modal>
    </>
  )
}
