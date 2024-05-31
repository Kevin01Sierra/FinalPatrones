package com.api.crud.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.crud.models.CupoOfflineModel;
import com.api.crud.models.FacturaModel;
import com.api.crud.models.FacturaOfflineModel;
import com.api.crud.models.ParqueaderoModel;
import com.api.crud.models.TarifaModel;
import com.api.crud.models.TarjetaCreditoModel;
import com.api.crud.models.CupoModel;
import com.api.crud.repositories.ICupoRepository;
import com.api.crud.repositories.IParqueaderoRepository;
import com.api.crud.repositories.ICupoOfflineRepository;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CupoService {
    
    @Autowired
    private ICupoRepository cupoRepository;

    @Autowired
    private ICupoOfflineRepository cupoOfflineRepository;

    @Autowired
    private IParqueaderoRepository parqueaderoRepository;

    @Autowired
    private TarifaService tarifaService;

    @Autowired
    private TarjetaCreditoService tarjetaCreditoService;

    @Autowired
    private FacturaService facturaService;

    
    @Autowired
    private FacturaOfflineService facturaOfflineService;

    public CupoModel guardarCupo(CupoModel cupo){
        return cupoRepository.save(cupo);
    }

    public CupoOfflineModel guardarCupoOffline(CupoOfflineModel cupo){
        return cupoOfflineRepository.save(cupo);
    }

    public CupoModel buscarCodigo(String codigo){
        return cupoRepository.findByCodigo(codigo).get();
    }

    public List<CupoModel> buscarCupos(Long usuario){
        return cupoRepository.buscarByUsuario(usuario);
    }

    public boolean ocuparCupo(String codigo) {
        Optional<CupoModel> cupoReservado = cupoRepository.findByCodigoAndEstado(codigo, CupoModel.Estado.RESERVADO);
        if (cupoReservado.isPresent()) {
            cupoReservado.get().setEstado(CupoModel.Estado.OCUPADO);
            cupoRepository.save(cupoReservado.get());
            actualizarParqueadero(cupoReservado.get().getParqueadero_fk(),cupoReservado.get().getVehiculo_fk(),1);
            return true;
        }
        return false;
    }

    public FacturaModel finalizarCupoOnline(String codigo) {
        Optional<CupoModel> cupoOnline = cupoRepository.findByCodigo(codigo);
        if(cupoOnline.isPresent()){
            cupoOnline.get().setHora_salida(ManejarFechas.obtenerFechaActual());
            cupoOnline.get().setEstado(CupoModel.Estado.FINALIZADO);
            actualizarParqueadero(cupoOnline.get().getParqueadero_fk(),cupoOnline.get().getVehiculo_fk(),-1);
            FacturaModel facturaModel = realizarFacturaOnline(cupoOnline.get());
            cupoRepository.save(cupoOnline.get());
            return facturaModel;
        }
        
        return null;
    }

    public FacturaOfflineModel finalizarCupoOffline(String codigo){
        Optional<CupoOfflineModel> cupoOffline = cupoOfflineRepository.findByCodigo(codigo);
        if(cupoOffline.isPresent()){
            cupoOffline.get().setHora_salida(ManejarFechas.obtenerFechaActual());
            cupoOffline.get().setEstado(CupoOfflineModel.Estado.FINALIZADO);
            actualizarParqueadero(cupoOffline.get().getParqueadero_fk(),cupoOffline.get().getVehiculo_fk(),-1);
            FacturaOfflineModel factura = realizarFacturaOffline(cupoOffline.get());
            cupoOfflineRepository.save(cupoOffline.get());
            return factura;
        }
        return null;
    }

     public boolean cancelarReserva(Long cupoId) {
        Optional<CupoModel> cupoReservado = cupoRepository.findByIdAndEstado(cupoId, CupoModel.Estado.RESERVADO);
        if (cupoReservado.isPresent()) {
            cupoReservado.get().setEstado(CupoModel.Estado.CANCELADO);
            cupoRepository.save(cupoReservado.get());
            return true;
        }
        return false;
     }

    public boolean verificarDisponibilidadCupo(Long parqueaderoId, Long vehiculoId, Date horaLlegada){
        List<CupoModel> cuposReservados = cupoRepository.findByParqueaderoAndVehiculoReservado(parqueaderoId, vehiculoId);
        Date horaLlegadaEvaluar = new Date();
        Date horaSalidaEvaluar = new Date();
        int horasPedidas = 0;
        int cuposUtilizados = 0;
        for (int i=0;i<cuposReservados.size();i++){
            horaLlegadaEvaluar = cuposReservados.get(i).getHora_llegada();
            horasPedidas = cuposReservados.get(i).getHoras_pedidas();
            horaSalidaEvaluar = ManejarFechas.sumarHoras(horaLlegadaEvaluar,horasPedidas);
            if (horaLlegada.before(horaSalidaEvaluar) || horaLlegada.after(horaLlegadaEvaluar) || horaLlegada.equals(horaLlegadaEvaluar)){
                cuposUtilizados+=1;
            }
        }

        cuposUtilizados = cuposUtilizados + cupoRepository.findByParqueaderoAndVehiculoOcupado(parqueaderoId, vehiculoId).size();
        cuposUtilizados = cuposUtilizados + cupoOfflineRepository.findByParqueaderoAndVehiculoOcupado(parqueaderoId, vehiculoId).size();

        Optional<ParqueaderoModel> parqueadero = parqueaderoRepository.findById(parqueaderoId);
        String tipoVehiculo = cupoRepository.findVehicleTypeById(vehiculoId);
        int cupoTotal = 0;

        switch (tipoVehiculo.toUpperCase()) {
            case "CARRO":
                cupoTotal = parqueadero.get().getCupo_carro_total();
                break;
            case "MOTO":
                cupoTotal = parqueadero.get().getCupo_moto_total();
                break;
            case "BICICLETA":
                cupoTotal = parqueadero.get().getCupo_bici_total();
                break;
        }

        if (cuposUtilizados < cupoTotal){
            return true;
        }else{
            return false;
        }
        
    }

    public void actualizarParqueadero(Long parqueaderoId, Long vehiculoId, int cantidad){
        ParqueaderoModel parqueadero = parqueaderoRepository.findById(parqueaderoId).get();
        String tipoVehiculo = cupoRepository.findVehicleTypeById(vehiculoId);

        switch (tipoVehiculo.toUpperCase()) {
            case "CARRO":
                parqueadero.setCupo_uti_carro(parqueadero.getCupo_uti_carro() + cantidad);
                break;
            case "MOTO":
                parqueadero.setCupo_uti_moto(parqueadero.getCupo_uti_moto() + cantidad);
                break;
            case "BICICLETA":
                parqueadero.setCupo_uti_bici(parqueadero.getCupo_uti_bici() + cantidad);
                break;
        }
        parqueaderoRepository.save(parqueadero);
    }

    

    private FacturaModel realizarFacturaOnline(CupoModel cupo){
        FacturaModel factura = new FacturaModel();
        TarifaModel tarifa = tarifaService.obtenerTarifaParqueadero(cupo.getParqueadero_fk()).get();
        TarjetaCreditoModel tarjeta = tarjetaCreditoService.obtenerTarjetas(cupo.getUsuario_fk()).get(0);
        
        BigDecimal valorOrdinario = BigDecimal.valueOf(CalculoPrecioService.CalcularPrecio(tarifa, cupo.getHoras_pedidas()));
        Date horaSalidaSolicitada = ManejarFechas.sumarHoras(cupo.getHora_llegada(), cupo.getHoras_pedidas());
        BigDecimal valorExtraordinario = BigDecimal.valueOf(0);
        if(horaSalidaSolicitada.before(cupo.getHora_salida())){
            valorExtraordinario = CalculoPrecioService.CalcularPrecioExtraOrdinario(tarifa, horaSalidaSolicitada, cupo.getHora_salida());
        }
        BigDecimal valorTotal = valorOrdinario.add(valorExtraordinario);

        factura.setValorOrdinario(valorOrdinario);
        factura.setValorExtraordinario(valorExtraordinario);
        factura.setValorTotal(valorTotal);
        factura.setCupoId(cupo.getId());
        factura.setVehiculoId(cupo.getVehiculo_fk());
        factura.setParqueaderoId(cupo.getParqueadero_fk());
        factura.setUsuarioId(cupo.getUsuario_fk());
        factura.setTarjetaCreditoId(tarjeta.getId());
        factura.setFechaCreacion(ManejarFechas.obtenerFechaActual());
        factura.setActivo(true);
        FacturaModel facturaFinal = facturaService.guardarFactura(factura);

        return facturaFinal;

    }

    private FacturaOfflineModel realizarFacturaOffline(CupoOfflineModel cupo){
        FacturaOfflineModel factura = new FacturaOfflineModel();
        TarifaModel tarifa = tarifaService.obtenerTarifaParqueadero(cupo.getParqueadero_fk()).get();
        
        BigDecimal valorTotal = CalculoPrecioService.CalcularPrecioOffline(tarifa, cupo.getHora_llegada(), cupo.getHora_salida());
    
        factura.setValorPagado(valorTotal);
        factura.setCupoOfflineId(cupo.getId());
        factura.setVehiculoId(cupo.getVehiculo_fk());
        factura.setParqueaderoId(cupo.getParqueadero_fk());
        factura.setFechaCreacion(ManejarFechas.obtenerFechaActual());
        factura.setActivo(true);
        FacturaOfflineModel facturaFinal = facturaOfflineService.guardarFactura(factura);
        
        return facturaFinal;
    }

}

