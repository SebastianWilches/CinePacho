import React, { useState } from 'react';

export default function GenerarEmpleado() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    role: '',
    idNumber: '',
    phoneNumber: '',
    position: '',
    multiplex: '',
    agilePoints: '',
    email: '',
    password: '',
    photo: null
  });

  const handleInputChange = (event) => {
    if (event.target.name === 'photo') {
      setNewEmployee({
        ...newEmployee,
        [event.target.name]: event.target.files[0]
      });
    } else {
      setNewEmployee({
        ...newEmployee,
        [event.target.name]: event.target.value
      });
    }
  };

  const handleAddEmployee = () => {
    if (newEmployee.name.trim() !== '' && newEmployee.role.trim() !== '') {
      setEmployees([...employees, newEmployee]);
      setNewEmployee({
        name: '',
        role: '',
        idNumber: '',
        phoneNumber: '',
        position: '',
        multiplex: '',
        agilePoints: '',
        email: '',
        password: '',
        photo: null
      });
    }
  };

  const handleRemoveEmployee = (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees.splice(index, 1);
    setEmployees(updatedEmployees);
  };

  const roles = ['Vendedor de Snacks', 'Aseo', 'Promotor'];
  const positions = ['Gerente', 'Supervisor', 'Operador'];
  const multiplexes = ['Multiplex A', 'Multiplex B', 'Multiplex C'];
  const agilePoints = ['10', '20', '30', '40', '50'];

  return (
    <div className="bg-white rounded p-4 shadow">
      <h3 className="text-xl font-bold mb-2">Gestión de Empleados</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            name="name"
            className="bg-gray-200 rounded p-2 w-full"
            value={newEmployee.name}
            onChange={handleInputChange}
          />
          <label className="block text-gray-700 mt-2">Rol</label>
          <select
            name="role"
            className="bg-gray-200 rounded p-2 w-full"
            value={newEmployee.role}
            onChange={handleInputChange}
          >
            <option value="">Seleccionar Rol</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <label className="block text-gray-700 mt-2">Cédula</label>
          <input
            type="text"
            placeholder="Cédula"
            name="idNumber"
            className="bg-gray-200 rounded p-2 w-full"
            value={newEmployee.idNumber}
            onChange={handleInputChange}
          />
          <label className="block text-gray-700 mt-2">Celular</label>
          <input
            type="text"
            placeholder="Celular"
            name="phoneNumber"
            className="bg-gray-200 rounded p-2 w-full"
            value={newEmployee.phoneNumber}
            onChange={handleInputChange}
          />
          <label className="block text-gray-700 mt-2">Correo</label>
          <input
            type="text"
            placeholder="Correo"
            name="email"
            className="bg-gray-200 rounded p-2 w-full"
            value={newEmployee.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="block text-gray-700">Cargo</label>
          <select
            name="position"
            className="bg-gray-200 rounded p-2 w-full"
            value={newEmployee.position}
            onChange={handleInputChange}
          >
            <option value="">Seleccionar Cargo</option>
            {positions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
          <label className="block text-gray-700 mt-2">Multiplex</label>
          <select
            name="multiplex"
            className="bg-gray-200 rounded p-2 w-full"
            value={newEmployee.multiplex}
            onChange={handleInputChange}
          >
            <option value="">Seleccionar Multiplex</option>
            {multiplexes.map((multiplex) => (
              <option key={multiplex} value={multiplex}>
                {multiplex}
              </option>
            ))}
          </select>
          <label className="block text-gray-700 mt-2">Puntos Ágiles</label>
          <select
            name="agilePoints"
            className="bg-gray-200 rounded p-2 w-full"
            value={newEmployee.agilePoints}
            onChange={handleInputChange}
          >
            <option value="">Seleccionar Puntos Ágiles</option>
            {agilePoints.map((points) => (
              <option key={points} value={points}>
                {points}
              </option>
            ))}
          </select>
          <label className="block text-gray-700 mt-2">Contraseña</label>
          <input
            type="text"
            placeholder="Contraseña"
            name="password"
            className="bg-gray-200 rounded p-2 w-full"
            value={newEmployee.password}
            onChange={handleInputChange}
          />
          <label className="block text-gray-700 mt-2">Foto</label>
        <input
          type="file"
          name="photo"
          className="bg-gray-200 rounded p-2 w-full"
          onChange={handleInputChange}
        />
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white rounded py-2 px-4 mb-4"
        onClick={handleAddEmployee}
      >
        Agregar Empleado
      </button>

      <h3 className="text-xl font-bold mb-2">Lista de Empleados</h3>
      {employees.length === 0 ? (
        <p>No hay empleados registrados.</p>
      ) : (
        <ul className="border border-gray-300 rounded">
          {employees.map((employee, index) => (
            <li key={index} className="p-4 border-b border-gray-300 last:border-b-0 flex justify-between">
              <div>
                <p className="text-lg font-bold">{employee.name}</p>
                <p>
                  <span className="font-bold">Rol:</span> {employee.role}
                </p>
                <p>
                  <span className="font-bold">Cédula:</span> {employee.idNumber}
                </p>
                <p>
                  <span className="font-bold">Celular:</span> {employee.phoneNumber}
                </p>
                <p>
                  <span className="font-bold">Cargo:</span> {employee.position}
                </p>
                <p>
                  <span className="font-bold">Multiplex:</span> {employee.multiplex}
                </p>
                <p>
                  <span className="font-bold">Puntos Ágiles:</span> {employee.agilePoints}
                </p>
                <p>
                  <span className="font-bold">Correo:</span> {employee.email}
                </p>
                <p>
                  <span className="font-bold">Contraseña:</span> {employee.password}
                </p>
                {employee.photo && (
                  <p>
                    <span className="font-bold">Foto:</span>{' '}
                    <a href={URL.createObjectURL(employee.photo)} style={{color: 'aqua'}} download={employee.photo.name}>
                      {employee.photo.name}
                    </a>
                  </p>
                )}
              </div>
              <button
                className="bg-red-500 hover:bg-red-600 text-white rounded py-2 px-4"
                onClick={() => handleRemoveEmployee(index)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};