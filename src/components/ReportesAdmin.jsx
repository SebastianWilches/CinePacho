import React from 'react';

var CanvasJSReact = require('@canvasjs/react-charts').default;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function ReportesAdmin() {
    const salesData = [
      { label: 'Avengers: Endgame', y: 70 },
      { label: 'Toy Story', y: 23 },
      { label: 'The Flash', y: 19 },
      { label: 'Rápidos y Furiosos', y: 30 }
    ];
  
    const options = {
      animationEnabled: true,
      title: {
        text: 'Venta de películas'
      },
      data: [{
        type: 'column',
        dataPoints: salesData
      }]
    };
  
    return (
      <div className="bg-white rounded p-4 shadow">
        <h3 className="text-2xl font-bold mb-2">Contenido de Reportes</h3>
        <div style={{ width: '100%', height: '400px' }}>
          <CanvasJSChart options={options} />
        </div>
      </div>
    );
  };