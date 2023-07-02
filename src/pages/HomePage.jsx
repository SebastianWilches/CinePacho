import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Modal, Button, Card } from '@rewind-ui/core';
import { useForm } from 'react-hook-form'
import { CineContext } from '../context/CineContext';


import './HomePage.css'

import img from '../img/Movie.png'
import star from '../img/Star.png'

export const HomePage = () => {

  const { setListaMultiplex, listaMultiplex, setSelectedMultiplex_ID } = useContext(CineContext);
  const urlBase = 'http://localhost:3001/';
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
            <img src={img} alt="Poster pelicula destacada" className='imgFeaturedMovie' />
            <div>
              <h3>WALK ALONE</h3>
              <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae tincidunt tellus. Donec semper odio sit amet ante efficitur tristique. Mauris volutpat convallis dui dictum maximus. Phasellus elementum ac tortor ut varius. Curabitur et tempus sapien, quis accumsan ante. Quisque lacus eros, molestie et nibh eu, tempor hendrerit metus.”</p>
              <div className='container--star'>
                <img src={star} alt="Icono Estrella" className='imgStar' />
                <img src={star} alt="Icono Estrella" className='imgStar' />
                <img src={star} alt="Icono Estrella" className='imgStar' />
                <img src={star} alt="Icono Estrella" className='imgStar' />
                <img src={star} alt="Icono Estrella" className='imgStar' />
              </div>
            </div>
            <div></div>
          </article>

          <article className='container--FeaturedMovie'>
            <div></div>
            <div>
              <h3>WALK ALONE</h3>
              <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae tincidunt tellus. Donec semper odio sit amet ante efficitur tristique. Mauris volutpat convallis dui dictum maximus. Phasellus elementum ac tortor ut varius. Curabitur et tempus sapien, quis accumsan ante. Quisque lacus eros, molestie et nibh eu, tempor hendrerit metus.”</p>
              <div className='container--star'>
                <img src={star} alt="Icono Estrella" className='imgStar' />
                <img src={star} alt="Icono Estrella" className='imgStar' />
                <img src={star} alt="Icono Estrella" className='imgStar' />
                <img src={star} alt="Icono Estrella" className='imgStar' />
                <img src={star} alt="Icono Estrella" className='imgStar' />
              </div>
            </div>
            <img src={img} alt="Poster pelicula destacada" className='imgFeaturedMovie' />
          </article>


          <article className='container--FeaturedMovie'>
            <img src={img} alt="Poster pelicula destacada" className='imgFeaturedMovie' />
            <div>
              <h3>WALK ALONE</h3>
              <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae tincidunt tellus. Donec semper odio sit amet ante efficitur tristique. Mauris volutpat convallis dui dictum maximus. Phasellus elementum ac tortor ut varius. Curabitur et tempus sapien, quis accumsan ante. Quisque lacus eros, molestie et nibh eu, tempor hendrerit metus.”</p>
              <div className='container--star'>
                <img src={star} alt="Icono Estrella" className='imgStar' />
                <img src={star} alt="Icono Estrella" className='imgStar' />
                <img src={star} alt="Icono Estrella" className='imgStar' />
                <img src={star} alt="Icono Estrella" className='imgStar' />
                <img src={star} alt="Icono Estrella" className='imgStar' />
              </div>
            </div>
            <div></div>
          </article>
        </section>
      </article>
      <Footer />


      <Modal closeOnEscape={false} overlayCloseOnClick="false" position="center" size="md" open={open} onClose={() => setOpen(false)}>
        <Card>
          <Card.Header>Selecciona tu multiplex</Card.Header>
          <Card.Body>
            <form className='container-loginForm' onSubmit={handleSubmit((data) => { setSelectedMultiplex_ID(data.selectedMultiplex_ID) })}>
              <label>Nombre multiplex: </label>
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
