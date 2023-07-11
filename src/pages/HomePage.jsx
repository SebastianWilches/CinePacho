import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Modal, Button, Card } from "@rewind-ui/core";
import { useForm } from "react-hook-form";
import { CineContext } from "../context/CineContext";
import { AiFillStar } from "react-icons/ai";

import "./HomePage.css";

// import img from '../../public/Movie.png'
import star from "../img/Star.png";

export const HomePage = () => {
  const { setListaMultiplex, listaMultiplex, setSelectedMultiplex_ID } =
    useContext(CineContext);
  const urlBase = "http://localhost:3001/";
  const { register, handleSubmit } = useForm(); //State del form
  const [open, setOpen] = useState(false); //Modal
  const [cartelera, setCartelera] = useState([]);
  const [estrellas, setEstrellas] = useState([]);

  useEffect(() => {
    GET_Multiplex();
    GET_Cartelera();
    setOpen(true);
  }, []);

  const GET_Multiplex = async () => {
    const response = await fetch(`${urlBase}listarMultiplex`);
    const { listaMultiplex } = await response.json();

    setListaMultiplex(listaMultiplex);
  };

  const GET_Cartelera = async () => {
    const response = await fetch(`${urlBase}listaPeliculas`);
    const data = await response.json();
    console.log(data);
    setCartelera(data.listaPeliculas);
  };

  return (
    <>
      <Header></Header>
      <article className="container">
        <h2 className="title-container">
          ¡Encuentra los mejores estrenos aquí!
        </h2>
        <section className="section-carteleta-homepage">
          {cartelera?.map((pelicula, index) => {
            return (
              <article className="container--FeaturedMovie" key={index}>
                <img
                  src={pelicula.direccionFoto}
                  alt="Poster pelicula destacada"
                  className="imgFeaturedMovie"
                />
                <div>
                  <h3>{pelicula.titulo}</h3>
                  <p>{pelicula.descripcion}</p>
                  <div className="container--star">
                    <AiFillStar className="imgStar" />
                    <p>{pelicula.puntajePromedio}</p>
                    <AiFillStar className="imgStar" />

                    {/* <AiFillStar className="imgStar" />
                    <AiFillStar className="imgStar" />
                    <AiFillStar className="imgStar" /> */}
                  </div>
                </div>
                <div></div>
              </article>
            );
          })}
        </section>
      </article>
      <Footer />

      <Modal
        closeOnEscape={false}
        overlayCloseOnClick="false"
        position="center"
        size="md"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Card>
          <Card.Header>
            <b>Selecciona tu multiplex</b>
          </Card.Header>
          <Card.Body>
            <form
              className="container-selectMultiplex"
              onSubmit={handleSubmit((data) => {
                setSelectedMultiplex_ID(data.selectedMultiplex_ID);
                setOpen(false);
              })}
            >
              <select {...register("selectedMultiplex_ID", { required: true })} className="input-select-homepage-multiplex">
                <option value=""></option>
                {listaMultiplex.map((multi, index) => {
                  return (
                    <option value={multi.multiplex_id} key={index}>
                      {multi.nombreMultiplex}
                    </option>
                  );
                })}
              </select>
              <input className="button-submit" type="submit" />
            </form>
          </Card.Body>
        </Card>
      </Modal>
    </>
  );
};
