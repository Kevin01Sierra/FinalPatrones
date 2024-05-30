package com.api.crud.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.crud.DTO.Request.UsuarioRequest;
import com.api.crud.DTO.Response.ParqueaderoUsuarioResponse;
import com.api.crud.services.ParqueaderoUsuarioService;

@RestController
@RequestMapping("")
public class ParqueaderoUsuarioController {
    @Autowired
    private ParqueaderoUsuarioService parqueaderoUsuarioService;

    @CrossOrigin(origins = "https://backend-parqueadero-production.up.railway.app")
    @PostMapping("/parqueaderoAdmi")
    public Map<String, Object> parqueaderoAdmi(@RequestBody UsuarioRequest usuario) {
        ParqueaderoUsuarioResponse parquaderoInfo = new ParqueaderoUsuarioResponse();
        parquaderoInfo.setParqueadero(parqueaderoUsuarioService.obtenerIdParqueadero(usuario.getUsuario_id()));
        parquaderoInfo.setUsuario(usuario.getUsuario_id());
        return Map.of("data", parquaderoInfo, "msg", "Parqueaderos");
    }
}
