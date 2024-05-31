
import React, { useState, useEffect } from 'react';

import './FormModificarParqueadero.css'

function FormModificarParqueadero() {
    const URL_CIUDADES = "https://backend-parqueadero-production.up.railway.app/obtenerCiudades";
    const URL_PARQUEADEROS = "https://backend-parqueadero-production.up.railway.app/parqueaderoCiudadBasico";
    const URL_PARQUEADERO_ESPECIFICO = "https://backend-parqueadero-production.up.railway.app/obtenerParqueadero";
    const URL_MODIFICAR_PARQUEADERO = "https://backend-parqueadero-production.up.railway.app/modificarParqueadero";
    /*
    se necesita el endpoint para modificar el parqueadero, el fetch ya está falta reemplazar
    la URL en la constante de arriba
    */

    const [datosCiudades, setDatosCiudades] = useState(null);
    const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");
    const [parqueaderoSeleccionado, setParqueaderoSeleccionado] = useState("");
    const [visibilidadSegundoSelect, setVisibilidadSegundoSelect] = useState(false);
    const [visibilidadFormModificarParqueadero, setvisibilidadFormModificarParqueadero] = useState(false);
    const [datosParqueaderos, setDatosParqueaderos] = useState(null);
    const [nombreParqueadero, setNombreParqueadero] = useState("");
    const [cuposBicicleta, setCuposBicicleta] = useState("");
    const [cuposMotos, setCuposMoto] = useState("");
    const [cuposCarro, setCuposCarro] = useState("");
    const [precioCarros, setPrecioCarros] = useState('');
    const [precioMotos, setPrecioMotos] = useState('');
    const [precioCiclas, setPrecioCiclas] = useState('');
    const [precioMoraCarro, setPrecioMoraCarro] = useState('');
    const [precioMoraMoto, setPrecioMoraMoto] = useState('');
    const [precioMoraBici, setPrecioMoraBici] = useState('');

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
                setDatosParqueaderos(data);
                setVisibilidadSegundoSelect(true);
            })
            .catch(error => {
                console.error('Problema:', error);
            });
    }

    const handleChangeParking = async (event) => {
        const idParqueaderoSeleccionado = event.target.value;
        fetch(URL_PARQUEADERO_ESPECIFICO, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                parqueadero_id: idParqueaderoSeleccionado
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Problema: ' + response.statusText);
                }
                return response.json();
            })
            .then(responseData => {
                console.log(responseData.data);
                setParqueaderoSeleccionado(responseData.data);
                setvisibilidadFormModificarParqueadero(true);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        console.log(parqueaderoSeleccionado);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let data = {
            id: parqueaderoSeleccionado.id,
            nombre: nombreParqueadero,
            cupo_bici_total: cuposBicicleta,
            cupo_carro_total: cuposCarro,
            cupo_moto_total: cuposMotos,
            precio_normal_carro: precioCarros,
            precio_normal_moto: precioMotos,
            precio_normal_ciclas: precioCiclas,
            precio_mora_carro: precioMoraCarro,
            precio_mora_moto: precioMoraMoto,
            precio_mora_bici: precioMoraBici
        }
        console.log(data);
        fetch(URL_MODIFICAR_PARQUEADERO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
                alert("Parqueadero Modificado");
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div id='container-modificar-parqueadero'>
            <div id='seleccionar'>
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
                {visibilidadFormModificarParqueadero && (
                    <>
                        <form id='form-modificar-parqueadero' onSubmit={handleSubmit}>
                            <div className='div-input-modificar-parqueadero'>
                                <label>Nombre:</label>
                                <input className='input-modificar-parqueadero'
                                    type="text"
                                    placeholder={parqueaderoSeleccionado.nombre}
                                    onChange={(e) => setNombreParqueadero(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='div-input-modificar-parqueadero'>
                                <label>Cupos para moto:</label>
                                <input className='input-modificar-parqueadero'
                                    type="number"
                                    placeholder={parqueaderoSeleccionado.cupo_moto_total}
                                    onChange={(e) => setCuposMoto(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='div-input-modificar-parqueadero'>
                                <label>Cupos para carro:</label>
                                <input className='input-modificar-parqueadero'
                                    type="number"
                                    placeholder={parqueaderoSeleccionado.cupo_carro_total}
                                    onChange={(e) => setCuposCarro(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='div-input-modificar-parqueadero'>
                                <label>Cupos para bicicleta:</label>
                                <input className='input-modificar-parqueadero'
                                    type="number"
                                    placeholder={parqueaderoSeleccionado.cupo_bici_total}
                                    onChange={(e) => setCuposBicicleta(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='div-input-modificar-parqueadero'>
                                <label>Precios para Carros:</label>
                                <input className='input-modificar-parqueadero'
                                    type="number"
                                    value={precioCarros}
                                    placeholder='Ingrese el valor para carros.'
                                    onChange={(e) => setPrecioCarros(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='div-input-modificar-parqueadero'>
                                <label>Precios para motos:</label>
                                <input className='input-modificar-parqueadero'
                                    type="number"
                                    value={precioMotos}
                                    placeholder='Ingrese el valor para motos.'
                                    onChange={(e) => setPrecioMotos(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='div-input-modificar-parqueadero'>
                                <label>Precio para Bicicletas:</label>
                                <input className='input-modificar-parqueadero'
                                    type="number"
                                    value={precioCiclas}
                                    placeholder='Ingrese el valor para bicicletas.'
                                    onChange={(e) => setPrecioCiclas(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='div-input-modificar-parqueadero'>
                                <label>Precio para Mora Carro:</label>
                                <input className='input-modificar-parqueadero'
                                    type="number"
                                    value={precioMoraCarro}
                                    placeholder='Ingrese el valor por mora'
                                    onChange={(e) => setPrecioMora(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='div-input-modificar-parqueadero'>
                                <label>Precio para Mora Moto:</label>
                                <input className='input-modificar-parqueadero'
                                    type="number"
                                    value={precioMoraMoto}
                                    placeholder='Ingrese el valor por mora'
                                    onChange={(e) => setPrecioMora(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='div-input-modificar-parqueadero'>
                                <label>Precio para Mora Bicicleta:</label>
                                <input className='input-modificar-parqueadero'
                                    type="number"
                                    value={precioMoraBici}
                                    placeholder='Ingrese el valor por mora'
                                    onChange={(e) => setPrecioMora(e.target.value)}
                                    required
                                />
                            </div>
                            <button id='btn-modificar-parqueadero' type="submit">Enviar</button>
                        </form>
                    </>
                )}

            </div>
        </div>
    );
}
export default FormModificarParqueadero;