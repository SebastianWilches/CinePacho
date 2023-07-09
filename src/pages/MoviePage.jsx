import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { DotSpinner } from '@uiball/loaders';


import './MoviePage.css'
import Footer from '../components/Footer';
import SillaForm from '../components/SillaForm';
import { FaBook, FaFaceLaugh, FaRegClock, FaRegStar } from 'react-icons/fa6';

export const MoviePage = () => {
    const { id: idPelicula } = useParams();
    const urlBase = 'http://localhost:3001/';
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const [value, setValue] = React.useState(2);



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
                                    <h4 className='infoMovie'><FaBook className='iconMovie' /><b>Género:</b>{movies[0].genero}</h4>
                                    <h4 className='infoMovie'><FaFaceLaugh className='iconMovie' /><b>Clasificación:</b> +{movies[0].clasificacionedad} años</h4>
                                    <h4 className='infoMovie'><FaRegClock className='iconMovie' /><b>Duración:</b>{movies[0].duracion} minutos</h4>
                                    <h4 className='infoMovie'><FaRegStar className='iconMovie' /><b>Calificación:</b>{movies[0].puntajePromedio}</h4>

                                    <SillaForm idPelicula={idPelicula} />

                                    
                                </section>
                            </>
                        )

                }

            </article>
            <Footer></Footer>
        </>
    )
}
