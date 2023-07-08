import React, { useState } from 'react';

export default function GenerarEmpleado() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    birthDate: '',
    role: ''
  });

  const handleInputChange = (event) => {
    setNewEmployee({
      ...newEmployee,
      [event.target.name]: event.target.value
    });
  };

  const handleAddEmployee = () => {
    if (newEmployee.name.trim() !== '' && newEmployee.birthDate.trim() !== '' && newEmployee.role.trim() !== '') {
      const age = calculateAge(newEmployee.birthDate);
      const employee = { ...newEmployee, age };
      setEmployees([...employees, employee]);
      setNewEmployee({
        name: '',
        birthDate: '',
        role: ''
      });
    }
  };

  const handleRemoveEmployee = (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees.splice(index, 1);
    setEmployees(updatedEmployees);
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const dob = new Date(birthDate);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="bg-white rounded p-4 shadow">
      <h3 className="text-xl font-bold mb-2">Gestión de Empleados</h3>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Nombre"
          name="name"
          className="bg-gray-200 rounded p-2 w-40 mr-2"
          value={newEmployee.name}
          onChange={handleInputChange}
        />
        <input
          type="date"
          placeholder="Fecha de Nacimiento"
          name="birthDate"
          className="bg-gray-200 rounded p-2 w-40 mr-2"
          value={newEmployee.birthDate}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Rol"
          name="role"
          className="bg-gray-200 rounded p-2 w-40"
          value={newEmployee.role}
          onChange={handleInputChange}
        />
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
            <li key={index} className="flex items-center p-3 border-b border-gray-300 last:border-b-0">
              <div className="flex-grow">
                <p className="text-lg font-bold">{employee.name}</p>
                <p className="text-gray-600">Edad: {employee.age}</p>
              </div>
              <div>
                <p className="text-gray-600">{employee.role}</p>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white rounded py-1 px-2"
                  onClick={() => handleRemoveEmployee(index)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};