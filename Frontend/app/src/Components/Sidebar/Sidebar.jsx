import React, { useState, useEffect } from 'react';
import SidebarButton from '../SidebarButton/SidebarButton.jsx'
import URL_IMG_USER from '../../assets/Persona.svg'
import URL_IMPACTO from '../../assets/LogoImpacto.svg'
import URL_UBICACIONES from '../../assets/LogoUbicaciones.svg'
import URL_CUENTAS from '../../assets/LogoCuentas.svg'
import URL_TRAZABILIDAD from '../../assets/LogoTrazabilidad.svg'
import URL_MODIFICACIONES from '../../assets/LogoModificaciones.svg'
import URL_VER_COMO from '../../assets/LogoVerComo.svg'
import URL_CERRAR_SESION from '../../assets/LogoCerrarSesion.svg'

import './Sidebar.css'

function Sidebar({vista}) {
    const [usuario, setUsuario] = useState([]);
    const URL_NOMBRE_USUARIO = '/endpointxd'
    const nombre = localStorage.getItem('userName');
    useEffect(() => {
        fetch(URL_NOMBRE_USUARIO)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Respuesta no ok :(');
                }
                return response.json();
            })
            .then(data => {
                setUsuario(data);
            })
            .catch(error => {
                console.error('aun no xd', error);
            });
    }, []);
    
  return (
    <div id='sidebar'>
        <div id='usuario'>
            <img src={URL_IMG_USER} alt="" />
            <label id="nombre-Usuario">{nombre}</label>
            <div>
            {vista === 'Gerente' && (<p>Gerente</p>)}{vista === 'Administrador' && (<p>Administrador</p>)}
            </div>
        </div>
        <form>
            <input type='text' id='busqueda' placeholder='Filtrar...'/>
        </form>
        <div id='botones'>
            {vista === 'Gerente' && (
                <>
                    <SidebarButton URL_BTN='/Gerente/Impacto' nombre='Impacto' URL_IMG={URL_IMPACTO}></SidebarButton>
                    <SidebarButton URL_BTN='/user' nombre='Ver como' URL_IMG={URL_VER_COMO}></SidebarButton>
                    <SidebarButton URL_BTN='/Gerente/Cuentas' nombre='Cuentas' URL_IMG={URL_CUENTAS}></SidebarButton>
                    <SidebarButton URL_BTN='/Gerente/Modificaciones' nombre='Modificaciones' URL_IMG={URL_MODIFICACIONES}></SidebarButton>
                    <SidebarButton URL_BTN='/Gerente/Trazabilidad' nombre='Trazabilidad' URL_IMG={URL_TRAZABILIDAD}></SidebarButton>
                </>
            )}
            {vista === 'Administrador' && (
                <>
                    <SidebarButton URL_BTN='/Admin/' nombre='Impacto' URL_IMG={URL_IMPACTO}></SidebarButton>
                    <SidebarButton URL_BTN='/user' nombre='Ver como' URL_IMG={URL_VER_COMO}></SidebarButton>
                    <SidebarButton URL_BTN='/Admin/Modificaciones' nombre='Modificaciones' URL_IMG={URL_MODIFICACIONES}></SidebarButton>
                </>
            )}
        </div>
        <div id='logout'>
            <SidebarButton URL_BTN='/Login' nombre='Cerrar sesión' URL_IMG={URL_CERRAR_SESION}></SidebarButton>
        </div>
    </div>
  );
}
export default Sidebar;