package com.api.crud.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.crud.models.CiudadModel;
import com.api.crud.repositories.ICiudadRepository;

@Service
public class CiudadService {
    @Autowired
    ICiudadRepository ciudadRepository;

    public List<CiudadModel> obtenerCiudades(boolean activo) {
        return ciudadRepository.findByActivo(activo);
    }

    public CiudadModel guardarCiudad(CiudadModel ciudad) {
        return ciudadRepository.save(ciudad);
    }

    public Optional<CiudadModel> buscarCiudad(Long ciudad){
        return ciudadRepository.findById(ciudad);
    }
}
