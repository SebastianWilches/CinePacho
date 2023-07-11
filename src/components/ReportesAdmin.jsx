import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import PDFGenerate from './PDFGenerate';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function ReportesAdmin() {
  const urlBase = 'http://localhost:3001/';
  const [movieRatingData, setMovieRatingData] = useState([]);
  const [jsonData, setJsonData] = useState(null);
  const [salesData, setSalesData] = useState(null);
  const [snacksData, setSnacksData] = useState(null);

  useEffect(() => {
    GET_peliculasMasVistas();
    GET_snacksMasVendidos();
    GET_valoracionPeliculas();
  },[])

  const GET_peliculasMasVistas = async () => {
        const response = await fetch(`${urlBase}peliculasMasVistas`, {
            method: 'GET'
        })
        const dataGET = await response.json();
        const dataJSON = JSON.stringify(dataGET, null, 2);
        const parsedData = JSON.parse(dataJSON);

        const salesData = parsedData.reporteDos.map(item => ({
          label: item.titulo,
          y: item.cantidadVistas
        }))

        setSalesData(salesData);
  }

  const GET_snacksMasVendidos = async () => {
    const response = await fetch(`${urlBase}snacksMasVendidos`, {
        method: 'GET'
    })
    const dataGET = await response.json();
    const dataJSON = JSON.stringify(dataGET, null, 2);
    const parsedData = JSON.parse(dataJSON);


    const snacksData = parsedData.reporteCuatro.map(item => ({
      label: item.nombresnack,
      y: item["count(c.cantidadcomprada)"]
    }))

    setSnacksData(snacksData);
  }

  const GET_valoracionPeliculas = async () => {
    const response = await fetch(`${urlBase}valoracionPeliculas`, {
        method: 'GET'
    })
    const dataGET = await response.json();
    console.log(dataGET);
    
    const dataJSON = JSON.stringify(dataGET, null, 2);
    const parsedData = JSON.parse(dataJSON);

    const datosParsed = parsedData.reporteTres;
    const puntajes = datosParsed.map(item => item.puntajepromedio);

    const arregloDividido = puntajes.map(dividirEnPartes);
    const resultado = arregloDividido;

    const labelMovie = datosParsed.map(item => ({
      label: item.titulo
    }))

    setMovieRatingData(resultado.map((arr, index) => ({
      label: labelMovie[index].label,
      pesima: arr[0],
      mala: arr[1],
      regular: arr[2],
      buena: arr[3],
      excelente: arr[4]
    })))

    // console.log(movieRatingData);

    // setMovieRatingData(movieRatingDataa);
  }


  useEffect(() => {
    console.log(movieRatingData);
  }, [movieRatingData])
  

  const GET_ventasCine = async () => {
    const response = await fetch(`${urlBase}ventasCine`, {
        method: 'GET'
    })
    const data = await response.json();
    return data;
  }

  const dividirEnPartes = (numero) => {
    const partes = [];
    let valorParte = Math.min(1, numero);
    
    for (let i = 0; i < 4; i++) {
      partes.push(valorParte);
      numero -= valorParte;
      valorParte = Math.max(0, Math.min(1, numero));
    }
  
    partes.push(numero);
  
    return partes;
  }

  const handleDisplayJson = async () => {
    try {
      const data = await GET_ventasCine();
      setJsonData(data);
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  // const movieRatingData = [
  //   { label: 'Los Vengadores', pesima: 1, mala: 1, regular: 1, buena: 0.7, excelente: 0 },
  //   { label: 'Joker', pesima: 1, mala: 1, regular: 1, buena: 1, excelente: 0.4 },
  //   { label: 'Toy Story 4', pesima: 1, mala: 1, regular: 1, buena: 0.4, excelente: 0 },
  //   { label: 'Alan Wake', pesima: 1, mala: 0.5, regular: 0, buena: 0, excelente: 0 }
  // ];

  const moviesData = [
    { label: 'Multiplex Titán', y: 20 },
    { label: 'Multiplex Unicentro', y: 30 },
    { label: 'Multiplex Plaza Central', y: 70 },
    { label: 'Multiplex Gran Estación', y: 35 },
    { label: 'Multiplex Eembajador (centro)', y: 22 },
    { label: 'Las Américas (centro)', y: 15 }
  ];

  const optionsMovies = {
    animationEnabled: true,
    title: {
      text: 'Películas más vistas'
    },
    data: [{
      type: 'pie',
      dataPoints: salesData
    }]
  };

  const optionsMultiplex = {
    animationEnabled: true,
    title: {
      text: 'Cantidad de ventas por multiplex'
    },
    data: [{
      type: 'bar',
      dataPoints: moviesData
    }]
  };

  const optionsSnacks = {
    animationEnabled: true,
    title: {
      text: 'Snacks más vendidos'
    },
    data: [{
      type: 'doughnut',
      dataPoints: snacksData
    }]
  };

  const optionsMovieRating = {
    animationEnabled: true,
    title: {
      text: 'Película más valorada'
    },
    axisX: {
      title: 'Película'
    },
    axisY: {
      title: 'Valoración',
      interval: 1,
      minimum: 0,
      maximum: 5
    },
    toolTip: {
      shared: true
    },
    legend: {
      verticalAlign: 'top'
    },
    data: [
      {
        type: 'stackedColumn',
        name: 'Pésima',
        showInLegend: true,
        dataPoints: movieRatingData.map((data) => ({ label: data.label, y: data.pesima }))
      },
      {
        type: 'stackedColumn',
        name: 'Mala',
        showInLegend: true,
        dataPoints: movieRatingData.map((data) => ({ label: data.label, y: data.mala }))
      },
      {
        type: 'stackedColumn',
        name: 'Regular',
        showInLegend: true,
        dataPoints: movieRatingData.map((data) => ({ label: data.label, y: data.regular }))
      },
      {
        type: 'stackedColumn',
        name: 'Buena',
        showInLegend: true,
        dataPoints: movieRatingData.map((data) => ({ label: data.label, y: data.buena }))
      },
      {
        type: 'stackedColumn',
        name: 'Excelente',
        showInLegend: true,
        dataPoints: movieRatingData.map((data) => ({ label: data.label, y: data.excelente }))
      }
    ]
  };

  const htmlContent = (
    <div className="bg-white rounded p-4">
      <h3 className="text-2xl font-bold mb-2">Contenido de Reportes</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div style={{ height: '400px' }}>
            <CanvasJSChart options={optionsMovies} />
          </div>
          <div style={{ height: '400px', marginTop: '2rem' }}>
            <CanvasJSChart options={optionsMultiplex} />
          </div>
        </div>
        <div>
          <div style={{ height: '400px' }}>
            <CanvasJSChart options={optionsSnacks} />
          </div>
          <div style={{ height: '400px', marginTop: '2rem' }}>
            <CanvasJSChart options={optionsMovieRating} />
          </div>
          <div>
              <button onClick={handleDisplayJson}>Desplegar JSON</button>
            {jsonData && (
              <pre>{JSON.stringify(jsonData, null, 2)}</pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <PDFGenerate 
      htmlContent={htmlContent}
      movieRatingData={movieRatingData} 
      moviesData={moviesData} 
      salesData={salesData} 
      snacksData={snacksData} 
    />
  );
}