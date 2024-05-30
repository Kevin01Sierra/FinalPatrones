package com.api.crud.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.crud.DTO.Response.ParqueaderoEstadisticasResponse;
import com.api.crud.models.ParqueaderoModel;
import com.api.crud.repositories.IFacturaRepository;
import com.api.crud.repositories.IFacturaOfflineRepository;
import com.api.crud.repositories.IParqueaderoRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Vector;
import java.util.logging.Logger;

@Service
public class ParqueaderoService {

    private static final Logger logger = Logger.getLogger(ParqueaderoService.class.getName());

    @Autowired
    private IParqueaderoRepository parqueaderoRepository;

    @Autowired
    private IFacturaRepository facturaRepository;

    @Autowired
    private IFacturaOfflineRepository facturaOfflineRepository;

    
    public Vector<ParqueaderoModel> obtenerParqueaderoCiudad(Long ciudad) {
        return parqueaderoRepository.findByCiudad(ciudad);
    }

    public Optional<ParqueaderoModel> obtenerParqueadero(Long parqueadero) {
        return parqueaderoRepository.findById(parqueadero);
    }

    public ParqueaderoModel guardarParqueadero(ParqueaderoModel parqueadero) {
        return parqueaderoRepository.save(parqueadero);
    }

    public Optional<ParqueaderoEstadisticasResponse> obtenerEstadisticasParqueadero(long parqueaderoId) {
        logger.info("Fetching parqueadero with ID: " + parqueaderoId);
        Optional<ParqueaderoModel> parqueaderoOpt = parqueaderoRepository.findById(parqueaderoId);

        if (parqueaderoOpt.isPresent()) {
            ParqueaderoModel parqueadero = parqueaderoOpt.get();

            List<String> labels = new ArrayList<>();
            List<Integer> CuposTotales = new ArrayList<>();
            List<Integer> CuposOcupados = new ArrayList<>();
            List<Integer> CuposDisponibles = new ArrayList<>();
            List<Integer> Ingresos = new ArrayList<>();

            labels.add("CARRO");
            labels.add("MOTO");
            labels.add("BICI");

            agregarEstadisticasPorVehiculo(parqueadero, "CARRO", CuposTotales, CuposOcupados, CuposDisponibles, Ingresos);
            agregarEstadisticasPorVehiculo(parqueadero, "MOTO", CuposTotales, CuposOcupados, CuposDisponibles, Ingresos);
            agregarEstadisticasPorVehiculo(parqueadero, "BICI", CuposTotales, CuposOcupados, CuposDisponibles, Ingresos);

            ParqueaderoEstadisticasResponse response = new ParqueaderoEstadisticasResponse();
            response.setLabels(labels);
            response.setCuposTotales(CuposTotales);
            response.setCuposOcupados(CuposOcupados);
            response.setCuposDisponibles(CuposDisponibles);
            response.setIngresos(Ingresos);

            return Optional.of(response);
        } else {
            logger.warning("Parqueadero not found with ID: " + parqueaderoId);
            return Optional.empty();
        }
    }

    public ParqueaderoEstadisticasResponse obtenerEstadisticasGlobales() {
        List<ParqueaderoModel> parqueaderos = parqueaderoRepository.findAll();
    
        List<String> labels = new ArrayList<>();
        List<Integer> CuposTotales = new ArrayList<>();
        List<Integer> CuposOcupados = new ArrayList<>();
        List<Integer> CuposDisponibles = new ArrayList<>();
        List<Integer> Ingresos = new ArrayList<>();
    
        labels.add("CARRO");
        labels.add("MOTO");
        labels.add("BICI");
    
        int totalCuposCarro = 0;
        int cuposOcupadosCarro = 0;
        int ingresosCarro = 0;
    
        int totalCuposMoto = 0;
        int cuposOcupadosMoto = 0;
        int ingresosMoto = 0;
    
        int totalCuposBici = 0;
        int cuposOcupadosBici = 0;
        int ingresosBici = 0;
    
        for (ParqueaderoModel parqueadero : parqueaderos) {
            Optional<ParqueaderoEstadisticasResponse> estadisticasOpt = obtenerEstadisticasParqueadero(parqueadero.getId());
            if (estadisticasOpt.isPresent()) {
                ParqueaderoEstadisticasResponse estadisticas = estadisticasOpt.get();
                
                totalCuposCarro += estadisticas.getCuposTotales().get(0);
                cuposOcupadosCarro += estadisticas.getCuposOcupados().get(0);
                ingresosCarro += estadisticas.getingresos().get(0);
    
                totalCuposMoto += estadisticas.getCuposTotales().get(1);
                cuposOcupadosMoto += estadisticas.getCuposOcupados().get(1);
                ingresosMoto += estadisticas.getingresos().get(1);
    
                totalCuposBici += estadisticas.getCuposTotales().get(2);
                cuposOcupadosBici += estadisticas.getCuposOcupados().get(2);
                ingresosBici += estadisticas.getingresos().get(2);
            }
        }
    
        CuposTotales.add(totalCuposCarro);
        CuposOcupados.add(cuposOcupadosCarro);
        CuposDisponibles.add(totalCuposCarro - cuposOcupadosCarro);
        Ingresos.add(ingresosCarro);
    
        CuposTotales.add(totalCuposMoto);
        CuposOcupados.add(cuposOcupadosMoto);
        CuposDisponibles.add(totalCuposMoto - cuposOcupadosMoto);
        Ingresos.add(ingresosMoto);
    
        CuposTotales.add(totalCuposBici);
        CuposOcupados.add(cuposOcupadosBici);
        CuposDisponibles.add(totalCuposBici - cuposOcupadosBici);
        Ingresos.add(ingresosBici);
    
        ParqueaderoEstadisticasResponse response = new ParqueaderoEstadisticasResponse();
        response.setLabels(labels);
        response.setCuposTotales(CuposTotales);
        response.setCuposOcupados(CuposOcupados);
        response.setCuposDisponibles(CuposDisponibles);
        response.setIngresos(Ingresos);
    
        return response;
    }

    private void agregarEstadisticasPorVehiculo(ParqueaderoModel parqueadero, String tipoVehiculo,
                                                 List<Integer> CuposTotales, List<Integer> CuposOcupados,
                                                 List<Integer> CuposDisponibles, List<Integer> Ingresos) {
        int totalCupos;
        int cuposOcupados;
        switch (tipoVehiculo) {
            case "CARRO":
                totalCupos = parqueadero.getCupo_carro_total();
                cuposOcupados = parqueadero.getCupo_uti_carro();
                break;
            case "MOTO":
                totalCupos = parqueadero.getCupo_moto_total();
                cuposOcupados = parqueadero.getCupo_uti_moto();
                break;
            case "BICI":
                totalCupos = parqueadero.getCupo_bici_total();
                cuposOcupados = parqueadero.getCupo_uti_bici();
                break;
            default:
                totalCupos = 0;
                cuposOcupados = 0;
        }

        int cuposDisponibles = totalCupos - cuposOcupados;
        Integer ingresosGeneradosPorFacturaOnline = facturaRepository.sumByParqueaderoIdAndVehiculoTipo(parqueadero.getId(), tipoVehiculo);
        if (ingresosGeneradosPorFacturaOnline == null) {
            ingresosGeneradosPorFacturaOnline = 0;
        }
        Integer ingresosGeneradosPorFacturaOffline = facturaOfflineRepository.sumByParqueaderoIdAndVehiculoTipo(parqueadero.getId(), tipoVehiculo);
        if (ingresosGeneradosPorFacturaOffline == null) {
            ingresosGeneradosPorFacturaOffline = 0;
        }
    
        int ingresosGenerados = ingresosGeneradosPorFacturaOnline + ingresosGeneradosPorFacturaOffline;

        CuposTotales.add(totalCupos);
        CuposOcupados.add(cuposOcupados);
        CuposDisponibles.add(cuposDisponibles);
        Ingresos.add(ingresosGenerados);
    }
}
