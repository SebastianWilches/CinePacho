import React, { useContext, useState } from 'react';
import GenerarEmpleado from '../components/CreateEmpleado'
import ReportesAdmin from '../components/ReportesAdmin'

import './AdminPage.css'
import { CineContext } from '../context/CineContext';

export const AdminPage = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const { setInfoCliente, setTokenCliente, setAuth, setIsLog } =
    useContext(CineContext);
    
    const handleButtonCerrarSesion = (e) => {
      //TODO eliminar datos de sesion
      setInfoCliente([]);
      setAuth(false);
      setTokenCliente([]);
      setIsLog(false);
    };

    const handleOptionClick = (option) => {
      setSelectedOption(option);
    };
  
    return (
      <div className="flex bg-gray-100 min-h-screen">
        <div className="w-1/4 bg-gray-800 text-white p-4">
          <h2 className="text-2xl font-bold mb-4">Panel de Superadministrador</h2>
          <ul className="space-y-2">
            <li>
              <a href="#empleados" className="block hover:text-gray-300" onClick={() => handleOptionClick('empleados')}>Empleados</a>
            </li>
            <li>
              <a href="#reportes" className="block hover:text-gray-300" onClick={() => handleOptionClick('reportes')}>Reportes</a>
            </li>
            <li>
              <a href="#reportes" className="block hover:text-gray-300" onClick={() => handleButtonCerrarSesion()}>Cerrar sesión</a>
            </li>
          </ul>
        </div>
        <div className="flex-grow p-4">
          {selectedOption === 'empleados' && <GenerarEmpleado />}
          {selectedOption === 'reportes' && <ReportesAdmin />}
        </div>
      </div>
    );
  };