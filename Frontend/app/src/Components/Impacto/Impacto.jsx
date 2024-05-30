import React, { useState, useEffect } from 'react';
import './Impacto.css'
import Sidebar from '../Sidebar/Sidebar';
import Chart from '../utilsAdmin/Chart';
function Impacto() {

  /*
  Ya quedó el consumo de ciudades y de parqueaderos por ciudad, El endpoint de un parqueadero
  específico parece no estar funcionando ni se ha definido cuales son los datos a proporcionar
  para generar las graficas por tanto hace falta 

  1. consumir los datos del parqueadero específico y generar las graficas.
  */

  const URL_CIUDADES = "https://backend-parqueadero-production.up.railway.app/obtenerCiudades"
  const URL_PARQUEADEROS = "https://backend-parqueadero-production.up.railway.app/parqueaderoCiudadBasico"
  const [datosCiudades, setDatosCiudades] = useState(null);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");
  const [visibilidadSegundoSelect, setVisibilidadSegundoSelect] = useState(false);
  const [datosParqueaderos, setDatosParqueaderos] = useState(null);

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
        setDatosParqueaderos(data);
        setVisibilidadSegundoSelect(true);
      })
      .catch(error => {
        console.error('Problema:', error);
      });
  }

  const handleChangeParking = async (event) =>{
    
  }

  return (
    <>
      <Sidebar vista={'Gerente'}></Sidebar>
      <div id="contenidoImpacto">
        <div id='seleccionar'>
          <h2>Estadísticas de uso</h2>
          <label htmlFor="ciudades">Seleccione una ciudad:</label>
          {datosCiudades && (
            <select id="ciudades" name="ciudades" value={ciudadSeleccionada} onChange={handleChange}>
              <option value=''></option>
              {datosCiudades.data.map(ciudad => (
                <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>
              ))}
            </select>
          )}
          {visibilidadSegundoSelect && (
            <>
              <label htmlFor="parqueaderos">Seleccione un parqueadero:</label>
              <select id="parqueaderos" name="parqueaderos" onChange={handleChangeParking}>
                <option value=''></option>
                {datosParqueaderos.data.map(parqueadero => (
                  <option key={parqueadero.id} value={parqueadero.id}>{parqueadero.nombre}</option>
                ))}
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