import './App.css'
import Cliente from '../Views/Cliente/PerfilCliente';
import Registro from '../Views/Registro/VistaRegistro';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Impacto from '../Views/Gerente/VistaGerenteImpacto.jsx';
import Modificaciones from '../Views/Gerente/VistaGerenteModificaciones.jsx' ;
import LogIn from '../Views/Login/VistaLogin'
import Codigo from '../Components/Codigo/Codigo';
import TarjetaCredito from './Registro/TarjetaCredito';
import CrearParqueadero from './utilsGerente/CrearParqueadero.jsx';
import LandingPage from './LangingPage/LandingPage';
import CrearCiudad from './utilsGerente/CrearCiudad.jsx';
import ParkingManagement from './utilsAdmin/ParkingManagement.jsx'
import Admin from '../Views/Admin/Admin';
import GerenteParqueaderos from './GerenteParqueaderos/GerenteParqueaderos.jsx';
import VistaGerenteImpacto from '../Views/Gerente/VistaGerenteImpacto.jsx';
function App() {
  return (
    <Router>
      <Routes>
        {/*Listos*/}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/registro" element={<Registro />} />

        {/*Mejorables*/}
        <Route path="/user" element={<Cliente />} />      
        
        {/*Detalles por definir*/}
        <Route path="/Gerente/Impacto" element={<VistaGerenteImpacto/>} />

        {/*Por trabajar*/}
        <Route path="/Gerente/Modificaciones" element={<Modificaciones/>} />
        <Route path="/Gerente/VerComo" element={<Impacto />} />
        <Route path="/Gerente/Cuentas" element={<Impacto />} />
             

        <Route path="/Gerente/CrearParqueadero" element={<CrearParqueadero />} />        
        <Route path="/Gerente/CrearCiudad" element={<CrearCiudad />} />
        
        <Route path="/Gerente/GerenteParqueaderos" element={<GerenteParqueaderos />} />
        <Route path="/Admin/Modificaciones" element={<ParkingManagement />} />

        {/*Prescindibles es que aca los estoy redirigiendo :C */}
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Gerente" element={<Impacto />} />
        
        
      </Routes>
    </Router>
  );
}

export default App;
