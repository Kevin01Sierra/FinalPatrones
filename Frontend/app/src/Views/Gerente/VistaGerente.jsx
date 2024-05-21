import Sidebar from '../../Components/Sidebar/Sidebar.jsx'
import Historial from '../../Components/Historial/Historial.jsx'
import Impacto from '../../Components/Impacto/Impacto.jsx';
import './VistaGerente.css'

function VistaGerente() {

    return (
        <>
            <Sidebar vista='Gerente' handle></Sidebar>
            <Impacto/> {/*COMPLETAMENTE QUITABLE, ESTA UNICAMENTE PARA PODER VERLO AHI */}
        </>
    );
}
export default VistaGerente;