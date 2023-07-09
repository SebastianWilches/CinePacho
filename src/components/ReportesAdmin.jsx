import React, { useRef } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import PDFGenerate from './PDFGenerate';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function ReportesAdmin() {
  const movieChartRef = useRef(null);
  const multiplexChartRef = useRef(null);
  const snacksChartRef = useRef(null);
  const movieRatingChartRef = useRef(null);

  const movieRatingData = [
    { label: 'Los Vengadores', pesima: 1, mala: 1, regular: 1, buena: 0.7, excelente: 0 },
    { label: 'Joker', pesima: 1, mala: 1, regular: 1, buena: 1, excelente: 0.4 },
    { label: 'Toy Story 4', pesima: 1, mala: 1, regular: 1, buena: 0.4, excelente: 0 },
    { label: 'Alan Wake', pesima: 1, mala: 0.5, regular: 0, buena: 0, excelente: 0 }
  ];

  const moviesData = [
    { label: 'Multiplex A', y: 20 },
    { label: 'Multiplex B', y: 30 },
    { label: 'Multiplex C', y: 70 },
    { label: 'Multiplex D', y: 25 }
  ];

  const salesData = [
    { label: 'Avengers: Endgame', y: 70 },
    { label: 'Toy Story', y: 23 },
    { label: 'The Flash', y: 19 },
    { label: 'Rápidos y Furiosos', y: 30 }
  ];

  const snacksData = [
    { label: 'Perro caliente', y: 15 },
    { label: 'Palomitas', y: 12 },
    { label: 'Nachos', y: 9 }
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

  const printImage = (chartRef) => {
    if (chartRef.current) {
      chartRef.current.render();
      chartRef.current.print();
    }
  };

  const htmlContent = (
    <div className="bg-white rounded p-4">
      <h3 className="text-2xl font-bold mb-2">Contenido de Reportes</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div style={{ height: '400px' }}>
            <CanvasJSChart options={optionsMovies} onRef={(ref) => (movieChartRef.current = ref)} />
            <button onClick={() => printImage(movieChartRef)}>Exportar Gráfica 1</button>
          </div>
          <div style={{ height: '400px', marginTop: '2rem' }}>
            <CanvasJSChart options={optionsMultiplex} onRef={(ref) => (multiplexChartRef.current = ref)} />
            <button onClick={() => printImage(multiplexChartRef)}>Exportar Gráfica 2</button>
          </div>
        </div>
        <div>
          <div style={{ height: '400px' }}>
            <CanvasJSChart options={optionsSnacks} onRef={(ref) => (snacksChartRef.current = ref)} />
            <button onClick={() => printImage(snacksChartRef)}>Exportar Gráfica 3</button>
          </div>
          <div style={{ height: '400px', marginTop: '2rem' }}>
            <CanvasJSChart options={optionsMovieRating} onRef={(ref) => (movieRatingChartRef.current = ref)} />
            <button onClick={() => printImage(movieRatingChartRef)}>Exportar Gráfica 4</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <PDFGenerate 
        htmlContent={htmlContent}
        movieRatingData={movieRatingData} 
        moviesData={moviesData} 
        salesData={salesData} 
        snacksData={snacksData} 
      />
    </>
  );
}
