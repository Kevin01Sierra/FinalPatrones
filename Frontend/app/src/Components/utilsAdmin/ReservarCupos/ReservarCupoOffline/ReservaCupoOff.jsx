import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Factura from '../../../Factura/Factura';
import './ReservaCupoOff.css';

export default function ReservaCupoOff({ isOpen, onClose }) {
    const nombre = localStorage.getItem('userName');
    const parqueaderoId = localStorage.getItem('parqueadero');
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [reservationData, setReservationData] = useState(null);

    const handleVehicleChange = (e) => {
        setSelectedVehicle(e.target.value);
    };

    const handleSubmit = async () => {
        if (!selectedVehicle) {
            toast.error('Seleccione un tipo de vehículo');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('https://backend-parqueadero-production.up.railway.app/reservarCupoOffline', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    parqueaderoId: parseInt(parqueaderoId, 10),
                    vehiculoId: parseInt(selectedVehicle, 10),
                }),
            });

            const data = await response.json();
            if (response.ok) {
                toast.success(`Cupo reservado con éxito. Código: ${data.data.codigo}`);
                setReservationData({
                    codigo: data.data.codigo,
                    horaLlegada: new Date().toLocaleString(),
                    vehiculo: selectedVehicle,
                    parqueadero: parqueaderoId,
                    ciudad: 'Ciudad Ejemplo', // Puedes cambiar esto según tus necesidades
                    horasPedidas: 1, // Puedes cambiar esto según tus necesidades
                });
            } else {
                toast.error(`Error: ${data.msg}`);
            }
        } catch (error) {
            toast.error('Error en la reserva, intente nuevamente');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="reservaCupoOff-backdrop">
            <div className="reservaCupoOff-container">
                <ToastContainer />
                <h1>Crear ticket</h1>
                <h2>{nombre}</h2>
                <div className="reservaCupoOff-cupos">
                    <select id="vehicle" value={selectedVehicle} onChange={handleVehicleChange}>
                        <option value="">Seleccione un tipo de vehículo</option>
                        <option value="1">Moto</option>
                        <option value="2">Carro</option>
                        <option value="3">Bicicleta</option>
                    </select>
                </div>

                <button 
                    className='reservaCupoOff-continuar' 
                    onClick={handleSubmit} 
                    disabled={isLoading}
                >
                    {isLoading ? 'Reservando...' : 'Continuar'}
                </button>
                <button className='reservaCupoOff-cerrar' onClick={onClose}>Cerrar</button>
                {reservationData && <Factura data={reservationData} />}
            </div>
        </div>
    );
}
