import React, { useState, useEffect } from 'react';
import './ParkingManagement.css'; // Importar los estilos CSS
import Sidebar from '../Sidebar/Sidebar';
import ReservaCupoOff from './ReservarCupos/ReservarCupoOffline/ReservaCupoOff';
import ReservarCupoOnline from './ReservarCupos/ReservarCupoOnline/ReservarCupoOnline';
import FinalizarReserva from './ReservarCupos/FinalizarReserva/FinalizarReserva';

const fetchParkingLot = async (parkingLotId) => {
  try {
    const response = await fetch('http://localhost:3241/obtenerParqueadero', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ parqueadero_id: parkingLotId }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching parking lot:', error);
    return null;
  }
};

const ParkingManagement = () => {
  const [parkingData, setParkingData] = useState(null);
  const [disponible, setDisponible] = useState(true);
  const [isReservaOpen, setReservaOpen] = useState(false);
  const [isReservaONOpen, setReservaONOpen] = useState(false);
  const [isFinalizarReservaOpen, setFinalizarReservaOpen] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchParkingLot(1); // Change the ID if needed
      setParkingData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="parking-management-container">
      <Sidebar vista={'Administrador'} />
      <h1 id="title-parkingManagement">Administración de cupos</h1>
      <div className="buttons-parkingManagement">
        <button
          className="button-parkingManagement green-parkingManagement"
          onClick={() => setDisponible(true)}
          disabled={disponible}
        >
          Ver Cupos en uso
        </button>
        <button
          className="button-parkingManagement red-parkingManagement"
          onClick={() => setDisponible(false)}
          disabled={!disponible}
        >
          Ver cupos en total
        </button>

        <button className="button-parkingManagement blue-parkingManagement" onClick={() => setReservaOpen(true)}>Reservar cupo OFFLINE</button>
        <button className="button-parkingManagement blue-parkingManagement" onClick={() => setReservaONOpen(true)}>Reservar cupo ONLINE</button>
        <button className="button-parkingManagement blue-parkingManagement" onClick={() => setFinalizarReservaOpen(true)}>Finalizar cupo </button>

      </div>

      <div className="data-container-parkingManagement">
        {parkingData ? (
          <div>
            <h2 id="parking-name">{parkingData.data.nombre}</h2>
            <table className="parking-table" id="parking-table">
              <thead>
                <tr>
                  <th>Vehículo </th>
                  <th>{disponible ? 'Cupos en uso' : 'Cupos Totales'}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Moto</td>
                  <td>{disponible ? parkingData.data.cupo_uti_moto : parkingData.data.cupo_moto_total}</td>
                </tr>
                <tr>
                  <td>Carro</td>
                  <td>{disponible ? parkingData.data.cupo_uti_carro : parkingData.data.cupo_carro_total}</td>
                </tr>
                <tr>
                  <td>Bicicleta</td>
                  <td>{disponible ? parkingData.data.cupo_uti_bici : parkingData.data.cupo_bici_total}</td>
                </tr>
              </tbody>
            </table>
            <ReservaCupoOff
              isOpen={isReservaOpen}
              onClose={() => setReservaOpen(false)} />
            <ReservarCupoOnline
              isOpen={isReservaONOpen}
              onClose={() => setReservaONOpen(false)} />
            <FinalizarReserva
              isOpen={isFinalizarReservaOpen}
              onClose={() => setFinalizarReservaOpen(false)} />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ParkingManagement;
