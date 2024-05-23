import './App.css'
import Cliente from '../Views/Cliente/PerfilCliente';
import Registro from '../Views/Registro/VistaRegistro';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Impacto from '../Views/Gerente/VistaGerenteImpacto.jsx';
import Modificaciones from '../Views/Gerente/VistaGerenteModificaciones.jsx' ;
import LogIn from '../Views/Login/VistaLogin'
import Codigo from '../Components/Codigo/Codigo';
import TarjetaCredito from './Registro/TarjetaCredito';
<<<<<<< Updated upstream
import CrearParqueadero from './utilsGerente/CrearParqueadero.jsx';
import LandingPage from './LangingPage/LandingPage';
import CrearCiudad from './utilsGerente/CrearCiudad.jsx';
import ParkingManagement from './utilsAdmin/ParkingManagement.jsx'
=======
import CrearParqueadero from '../Components/utilsGerente/CrearParqueadero.jsx'
import LandingPage from './LangingPage/LandingPage';
import CrearCiudad from './utilsGerente/CrearCiudad';
import ParkingManagement from './utilsAdmin/ParkingManagement';
>>>>>>> Stashed changes
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
        <Route path="/user/:userId" element={<Cliente />} />      
        
        {/*Detalles por definir*/}
<<<<<<< Updated upstream
        <Route path="/Gerente/Impacto" element={<VistaGerenteImpacto/>} />
=======
        
>>>>>>> Stashed changes

        {/*Por trabajar*/}
        <Route path="/Gerente/Modificaciones" element={<Modificaciones/>} />
        <Route path="/Gerente/VerComo" element={<Impacto />} />
        <Route path="/Gerente/Cuentas" element={<Impacto />} />
             

        <Route path="/Gerente/CrearParqueadero" element={<CrearParqueadero />} />        
        <Route path="/Gerente/CrearCiudad" element={<CrearCiudad />} />
        
        <Route path="/Gerente/GerenteParqueaderos" element={<GerenteParqueaderos />} />
        <Route path="/Admin/Administracion" element={<ParkingManagement />} />

        {/*Prescindibles es que aca los estoy redirigiendo :C */}
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Gerente" element={<Impacto />} />
        
      </Routes>
    </Router>
  );
}

export default App;
