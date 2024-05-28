import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import './Parqueadero.css';
import Pago from '../../Components/Pago/Pago';

export default function Parqueadero({ isOpen, onClose, idParqueadero, name, cupoCarro, cupoMoto, cupoBici, tipo }) {
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [reservationHours, setReservationHours] = useState(1);
  const [isPagoOpen, setIsPagoOpen] = useState(false);
  const [formattedDateTime, setFormattedDateTime] = useState('');

  const tarjetaId = localStorage.getItem('tarjetaId');
  const usuarioId = localStorage.getItem('usuarioId');

  const handleVehicleChange = (e) => {
    setSelectedVehicle(e.target.value);
  };

  const handleDateTimeChange = (date) => {
    setSelectedDateTime(date);
    const formatted = formatDateTime(date);
    setFormattedDateTime(formatted);
  };

  const handleHoursChange = (e) => {
    setReservationHours(e.target.value);
  };

  const formatDateTime = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    const hours = (`0${date.getHours()}`).slice(-2);
    return `${year}-${month}-${day} ${hours}:00:00`;
  };

  const handleSubmit = () => {
    if (!selectedVehicle || !selectedDateTime) {
      toast.error('Por favor, seleccione el tipo de vehículo y la fecha/hora de llegada.');
      return;
    }
    console.log('Formatted DateTime:', formattedDateTime);
    setIsPagoOpen(true);
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const handleClose = () => {
    setSelectedVehicle('');
    setSelectedDateTime(null);
    setReservationHours(1);
    setIsPagoOpen(false);
    onClose();
  };

  const handlePagoClose = () => {
    setIsPagoOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="backdrop">
      <div className="parqueadero">
        <ToastContainer />
        <h1>{name}</h1>
        <h2>{tipo}</h2>
        <div className="cupos">
          <div className="Select-Parqueadero">
            <select id="vehicle" value={selectedVehicle} onChange={handleVehicleChange}>
              <option value="">Seleccione un tipo de vehículo</option>
              <option value="1">Moto</option>
              <option value="2">Carro</option>
              <option value="3">Bicicleta</option>
            </select>
          </div>
          <div className="Select-DateTime">
            <h2>Seleccione la hora de llegada</h2>
            <DatePicker
              selected={selectedDateTime}
              onChange={handleDateTimeChange}
              showTimeSelect
              dateFormat="Pp"
              minDate={new Date()}
              filterTime={filterPassedTime}
              timeIntervals={60}
              placeholderText="Seleccione fecha y hora"
              className="date-picker"
            />
          </div>
          {selectedDateTime && (
            <div className="Select-Hours">
              <label htmlFor="hours">Horas a reservar:</label>
              <input
                type="number"
                id="hours"
                value={reservationHours}
                min="1"
                onChange={handleHoursChange}
              />
            </div>
          )}
        </div>
        <button
          className='reservar'
          onClick={handleSubmit}
          disabled={!selectedVehicle || !selectedDateTime}
        >
          Reservar
        </button>
        <button className='cerrar' onClick={handleClose}>Cerrar</button>
        <Pago 
          isOpen={isPagoOpen} 
          onClose={handlePagoClose} 
          data={{ 
            tarjetaId: parseInt(tarjetaId, 10),
            usuarioId: parseInt(usuarioId, 10),
            idParqueadero: parseInt(idParqueadero, 10),
            vehiculoId: parseInt(selectedVehicle, 10),
            hora_llegada: formattedDateTime,
            horas: parseInt(reservationHours, 10)
          }} 
        />
      </div>
    </div>
  );
}
