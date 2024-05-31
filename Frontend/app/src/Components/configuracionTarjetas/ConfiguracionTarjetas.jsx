import React, { useState, useEffect } from 'react';
import './ConfiguracionTarjetas.css';

function ConfiguracionTarjetas({ onClose }) {
  const [tarjetas, setTarjetas] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState('');

  useEffect(() => {
    const fetchTarjetas = async () => {
      try {
        const response = await fetch('http://localhost:3241/obtenerTarjetas');
        const result = await response.json();
        setTarjetas(result.data);
      } catch (error) {
        console.error('Error fetching tarjetas:', error);
      }
    };

    fetchTarjetas();
  }, []);

  const handleCardSelect = (event) => {
    const selectedId = event.target.value;
    setSelectedCardId(selectedId);
    localStorage.setItem('selectedCardId', selectedId);
  };

  return (
    <div className="tarjetas-credito-backdrop">
      <div className="tarjetas-credito-container">
        <h2>Seleccione una tarjeta de crédito</h2>
        <select value={selectedCardId} onChange={handleCardSelect}>
          <option value="" disabled>Seleccione una tarjeta</option>
          {tarjetas.map((tarjeta) => (
            <option key={tarjeta.id} value={tarjeta.id}>
              {tarjeta.numero} **** {tarjeta.numero.slice(-4)}
            </option>
          ))}
        </select>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default ConfiguracionTarjetas;
