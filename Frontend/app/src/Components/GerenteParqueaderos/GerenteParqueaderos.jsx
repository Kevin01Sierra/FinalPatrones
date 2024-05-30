import React, { useState, useEffect } from 'react';
import './GerenteParqueaderos.css';
import Sidebar from '../Sidebar/Sidebar';
import DetalleParqueadero from './DetalleParqueadero';

function GerenteParqueaderos() {
  const URL_CIUDADES = "https://backend-parqueadero-production.up.railway.app/obtenerCiudades";
  const URL_PARQUEADEROS_CIUDAD = "https://backend-parqueadero-production.up.railway.app/parqueaderoCiudad";

  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");
  const [ciudades, setCiudades] = useState([]);
  const [parqueaderos, setParqueaderos] = useState([]);
  const [parqueaderoSeleccionado, setParqueaderoSeleccionado] = useState(null);

  // Fetch cities on component mount
  useEffect(() => {
    const fetchCiudades = async () => {
      try {
        const response = await fetch(URL_CIUDADES);
        if (!response.ok) {
          throw new Error('Error fetching cities');
        }
        const data = await response.json();
        setCiudades(data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCiudades();
  }, []);

  // Fetch parking lots when a city is selected
  const handleChangeCiudad = async (event) => {
    const ciudad = event.target.value;
    setCiudadSeleccionada(ciudad);
    setParqueaderoSeleccionado(null);

    try {
      const response = await fetch(URL_PARQUEADEROS_CIUDAD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ciudad_fk: ciudad }),
      });

      if (!response.ok) {
        throw new Error('Error fetching parking lots');
      }

      const data = await response.json();
      setParqueaderos(data.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSelectParqueadero = (parqueadero) => {
    setParqueaderoSeleccionado(parqueadero);
  };

  return (
    <>
      <Sidebar vista={'Gerente'} />
      <div id="contenidoGerente">
        <div className='infoParqueaderos'>
          <h2>Estadísticas de uso</h2>
          <label htmlFor="ciudades">Selecciona una ciudad:</label>
          <select id="ciudades" name="ciudades" value={ciudadSeleccionada} onChange={handleChangeCiudad} className="select-ciudades">
            <option value="">Selecciona una ciudad</option>
            {ciudades.map((ciudad) => (
              <option key={ciudad.id} value={ciudad.id}>
                {ciudad.nombre}
              </option>
            ))}
          </select>
        </div>

        {ciudadSeleccionada && parqueaderos.length > 0 && (
          <table className="tabla-parqueaderos">
            <thead>
              <tr className='tr'>
                <th className='th'>Nombre</th>
                <th className='th'>Tipo</th>
                <th className='th'>Imágenes</th>
                <th className='th'>Acciones</th>
              </tr >
            </thead>
            <tbody>
              {parqueaderos.map((parqueadero) => (
                <tr key={parqueadero.id}>
                  <td>{parqueadero.nombre}</td>
                  <td>{parqueadero.tipo}</td>
                  <td>
                    {parqueadero.imagenes && parqueadero.imagenes.length > 0 ? (
                      parqueadero.imagenes.slice(0, 3).map((imagen, index) => (
                        <img key={index} src={imagen} alt={`Imagen ${index + 1}`} className="imagen-parqueadero" />
                      ))
                    ) : (
                      <span>No hay imágenes</span>
                    )}
                  </td>
                  <td>
                    <button className="accion-mostrar" onClick={() => handleSelectParqueadero(parqueadero)}>Mostrar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {parqueaderoSeleccionado && (
          <DetalleParqueadero parqueaderoDetalles={parqueaderoSeleccionado} />
        )}
      </div>
    </>
  );
}

export default GerenteParqueaderos;
