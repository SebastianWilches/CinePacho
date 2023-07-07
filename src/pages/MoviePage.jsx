import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { DotSpinner } from '@uiball/loaders';
import { useForm } from 'react-hook-form';

import './MoviePage.css'
import Footer from '../components/Footer';
import SillaForm from '../components/SillaForm';

export const MoviePage = () => {
    const { id: idPelicula } = useParams();
    const urlBase = 'https://cinepachoapi.azurewebsites.net/';
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    


    useEffect(() => {
        GET_Movies();
    }, [])


    const GET_Movies = async () => {
        const response = await fetch(`${urlBase}listaPeliculas`);
        const { listaPeliculas } = await response.json();

        let filterPeliculas = listaPeliculas.filter(item => item.pelicula_id == idPelicula);
        // console.log(filterPeliculas);

        setMovies(filterPeliculas);
        setLoading(false);
    }

    


    return (
        <>
            <article className='container container-pelicula'>
                {
                    loading ?
                        (<DotSpinner
                            size={40}
                            speed={0.9}
                            color="black"
                        />) :
                        (
                            <>
                                <img src={movies[0].direccionFoto} alt="Poster película" className='imgMoviePage' />
                                <section>
                                    <h1 className='titleMoviePage'>{movies[0].titulo}</h1>
                                    <h3>SINOPSIS</h3>
                                    <p>{movies[0].descripcion} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit quaerat adipisci, incidunt sint soluta ipsa eligendi fuga quibusdam error voluptatum nostrum deserunt? Nobis veniam optio quibusdam obcaecati aut laborum inventore.</p>
                                    <br></br>
                                    <h4>Género:{movies[0].genero}</h4>
                                    <h4>Clasificación: +{movies[0].clasificacionedad} años</h4>
                                    <h4>Duración:{movies[0].duracion} minutos</h4>
                                    <h4>Calificación:{movies[0].puntajePromedio}</h4>

                                    <SillaForm idPelicula={idPelicula}/>

                                    
                                </section>
                            </>
                        )

                }

            </article>
            <Footer></Footer>
        </>
    )
}
