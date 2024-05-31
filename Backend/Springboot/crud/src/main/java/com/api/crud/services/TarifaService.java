package com.api.crud.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.crud.models.TarifaModel;
import com.api.crud.repositories.ITarifaRepository;
import com.api.crud.repositories.IVehiculoRepository;

@Service
public class TarifaService {
    @Autowired
    ITarifaRepository tarifaRepository;

    @Autowired
    IVehiculoRepository vehiculoRepository;

    public Optional<TarifaModel> obtenerTarifaParqueadero(Long parqueadero){
        return tarifaRepository.findByParqueadero(parqueadero);
    }

    public Optional<TarifaModel> obtenerTarifaParqueaderoVehiculo(Long parqueadero,Long vehiculo){
        return tarifaRepository.findByParqueaderoAndVehiculo(parqueadero,vehiculo);
    }

    public TarifaModel crearTarifa(TarifaModel tarifa){
        return tarifaRepository.save(tarifa);
    }

    public void modificarTarifaPersonalizada(String vehiculo, Long parqueadero, int valorOrdinario, int valorMora){
        TarifaModel tarifa = obtenerTarifaParqueaderoVehiculo(parqueadero, vehiculoRepository.findVehicleTypeByName(vehiculo)).get();
        tarifa.setValor_mora(valorMora);
        tarifa.setValor_ordinario(valorOrdinario);
        tarifaRepository.save(tarifa);
    }

}
