import React, { useState } from 'react';
import GenerarEmpleado from '../components/GenerarEmpleado'

export const AdminPage = () => {
    const [selectedOption, setSelectedOption] = useState('');
  
    const handleOptionClick = (option) => {
      setSelectedOption(option);
    };
  
    return (
      <div className="flex">
        <div className="w-1/4 bg-gray-800 text-white p-4">
          <h2 className="text-xl font-bold mb-4">Panel de Superadministrador</h2>
          <ul className="space-y-2">
            <li>
              <a href="#inicio" className="block hover:text-gray-300">Inicio</a>
            </li>
            <li>
              <a href="#empleados" className="block hover:text-gray-300" onClick={() => handleOptionClick('empleados')}>Empleados</a>
            </li>
            <li>
              <a href="#reportes" className="block hover:text-gray-300" onClick={() => handleOptionClick('reportes')}>Reportes</a>
            </li>
          </ul>
        </div>
        <div className="flex-grow p-4">
          {selectedOption === 'empleados' && <GenerarEmpleado />}
          {selectedOption === 'reportes' && <p>Contenido de Reportes</p>}
        </div>
      </div>
    );
  };