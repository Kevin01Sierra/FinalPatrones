import React, { useState, useEffect } from 'react';
import './Impacto.css'
import Sidebar from '../Sidebar/Sidebar';
import Chart from '../gerenteUtils/Chart';
function Impacto() {
  const URL_CIUDADES = "http://localhost:3241/obtenerCiudades"
  const URL_PARQUEADEROS = "http://localhost:3241/parqueaderoCiudadBasico"
  const [datosCiudades, setDatosCiudades] = useState(null);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");
  const [visibilidadSegundoSelect, setVisibilidadSegundoSelect] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL_CIUDADES);
        if (!response.ok) {
          throw new Error('Problema: ' + response.statusText);
        }
        const ciudades = await response.json();
        setDatosCiudades(ciudades);
      } catch (error) {
        console.error('Problema:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = async (event) => {
    const idCiudadSeleccionada = event.target.value;
    setCiudadSeleccionada(idCiudadSeleccionada);
    console.log(idCiudadSeleccionada);
    fetch(URL_PARQUEADEROS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ciudad_fk: idCiudadSeleccionada })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Problema: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log("data:");
        console.log(data);
        
        setVisibilidadSegundoSelect(true);
      })
      .catch(error => {
        console.error('Problema:', error);
      });
  }

  return (
    <>
      <Sidebar vista={'Gerente'}></Sidebar>
      <div id="contenidoImpacto">
        <div id='seleccionar'>
          <h2>Estadísticas de uso</h2>
          <label htmlFor="ciudades">Selecciona una ciudad:</label>
          {datosCiudades && (
            <select id="ciudades" name="ciudades" value={ciudadSeleccionada} onChange={handleChange}>
              {datosCiudades.data.map(ciudad => (
                <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>
              ))}
            </select>
          )}
          {visibilidadSegundoSelect && (
            <>
              <label htmlFor="opciones">Selecciona una opción:</label>
              <select id="opciones" name="opciones">
                <option value="opA">Opción A</option>
                <option value="opB">Opción B</option>
                <option value="opC">Opción C</option>
              </select>
            </>
          )}
        </div>
        <Chart></Chart>
      </div>
    </>
  );
}
export default Impacto;