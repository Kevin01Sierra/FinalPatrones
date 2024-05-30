package com.api.crud.controllers;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.crud.DTO.Request.TarjetaRequest;
import com.api.crud.models.TarjetaCreditoModel;
import com.api.crud.models.UsuarioModel;
import com.api.crud.services.IEmailService;
import com.api.crud.services.ManejarFechas;
import com.api.crud.services.TarjetaCreditoService;
import com.api.crud.services.UsuarioService;
import com.api.crud.services.models.EmailDTO;

import jakarta.mail.MessagingException;

import java.util.Vector;

@RestController
@RequestMapping("")
public class TarjetaCreditoController {
    @Autowired
    private TarjetaCreditoService tarjetaCreditoService;

    @Autowired
    private UsuarioService userService;

    @Autowired
    private IEmailService emailService;

    @CrossOrigin(origins = "https://prueba3-rhby.vercel.app")
    @PostMapping("/guardarTarjeta")
    public Map<String, Object> guardarTarjeta(@RequestBody TarjetaRequest tarjeta) throws MessagingException {
        TarjetaCreditoModel tarjetaCredito = new TarjetaCreditoModel();
        tarjetaCredito.setFecha_creacion(ManejarFechas.obtenerFechaActual());
        tarjetaCredito.setNumero(tarjeta.getNumero());
        tarjetaCredito.setNombre_propietario(tarjeta.getNombre_propietario());
        tarjetaCredito.setUsuario_fk(tarjeta.getUsuario());
        tarjetaCredito.setCvc(tarjeta.getCvc());
        tarjetaCredito.setFecha_vencimiento(tarjeta.getFecha_vencimiento());
        tarjetaCredito.setActivo(true);
        tarjetaCreditoService.guardarTarjetaCredito(tarjetaCredito);
        Optional<UsuarioModel> usuario = userService.getPorId(tarjeta.getUsuario());
        EmailDTO email = new EmailDTO();
        email.setNumeroTarjeta(tarjeta.getNumero());
        email.setAsunto("Registro de tarjeta de credito");
        email.setDestinatario(usuario.get().getCorreo());
        emailService.enviarCorreoTarjeta(email);
        return Map.of("data", tarjetaCredito, "msg", "Tarjeta agregada");
    }

    @CrossOrigin(origins = "https://prueba3-rhby.vercel.app")
    @PostMapping("/tarjetaUsuario")
    public Map<String, Object> tarjetaUsuario(@RequestBody TarjetaRequest tarjeta) {
        Vector<TarjetaCreditoModel> tarjetas = tarjetaCreditoService.obtenerTarjetas(tarjeta.getUsuario());
        return Map.of("data", tarjetas, "msg", "OK");
    }

}
