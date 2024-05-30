import React, { useState, useEffect} from 'react';

function FormModificarCiudad() {
    const URL_CIUDADES = "https://backend-parqueadero-production.up.railway.app/obtenerCiudades";
    const URL_MODIFICAR_CIUDAD = "https://backend-parqueadero-production.up.railway.app/modificarCiudad"
    const [datosCiudades, setDatosCiudades] = useState(null);
    const [visibilidadForm, setVisibilidadForm] = useState(false);
    const [idCiudadSeleccionada, setIdCiudadSeleccionada] = useState("");
    const [nombreCiudad, setNombreCiudad] = useState("");

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

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(nombreCiudad);
        let data = {
            id: idCiudadSeleccionada,
            nombre: nombreCiudad
        }
        fetch(URL_MODIFICAR_CIUDAD, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Problema: ' + response.statusText);
                }
                return response.json();
            })
            .then(responseData => {
                console.log(responseData.data);
                alert("Ciudad Modificada")
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div id='container-modificar-ciudad'>
            <label htmlFor="ciudades">Seleccione una ciudad:</label>
            {datosCiudades && (
                <select id="ciudades" name="ciudades" onChange={(event) => {
                    setVisibilidadForm(true);
                    setIdCiudadSeleccionada(event.target.value);
                  }}>
                    <option value=''></option>
                    {datosCiudades.data.map(ciudad => (
                        <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>
                    ))}

                </select>
            )}
            {visibilidadForm && (
                <form id='form-modificar-ciudad' onSubmit={handleSubmit}>
                <div className='div-input-modificar-ciudad'>
                    <label>Nombre:</label>
                    <input className='input-modificar-ciudad'
                        type="text"
                        placeholder="Ingrese el nuevo nombre"
                        onChange={(e) => setNombreCiudad(e.target.value)}
                        required
                    />
                </div>
                <button id='btn-modificar-ciudad' type="submit">Enviar</button>
            </form>
            )}
        </div>
    );
}
export default FormModificarCiudad;