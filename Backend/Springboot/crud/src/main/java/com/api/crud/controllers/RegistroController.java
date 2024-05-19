package com.api.crud.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.crud.DTO.RegistroPersonaRequest;
import com.api.crud.models.UsuarioModel;
import com.api.crud.services.IEmailService;
import com.api.crud.services.UsuarioService;
import com.api.crud.services.models.EmailDTO;

import jakarta.mail.MessagingException;

import java.util.Date;
import java.util.Calendar;

@RestController
@RequestMapping("")
public class RegistroController {
    @Autowired
    private UsuarioService userService;

    @Autowired
    private IEmailService emailService;

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/registroPersona")
    public Map<String, Object> registroPersona(@RequestBody RegistroPersonaRequest registroPersona)
            throws MessagingException {
        String nombre = registroPersona.getNombre();
        String identificacion = registroPersona.getIdentificacion();
        String correo = registroPersona.getCorreo();
        String nombreAbreviado = nombre.substring(0, 3).toUpperCase();

        String ultimosDigitosIdentificacion = identificacion.substring(identificacion.length() - 2);
        String[] partesNombre = nombre.split(" ");
        String apellido = partesNombre[1];
        String abreviaturaApellido = apellido.substring(0, 3).toUpperCase();
        String usuario = nombreAbreviado + ultimosDigitosIdentificacion + abreviaturaApellido;

        // Genera`la contraseña
        String contrasena = userService.generarContrasenaAleatoria(5);

        // Encripta la contraseña
        String contrasenaEncriptada = userService.hashPassword(contrasena);

        Date fecha = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(fecha);
        calendar.add(Calendar.HOUR_OF_DAY, -5);
        Date fechaColombia = calendar.getTime();
        UsuarioModel usuarioModel = new UsuarioModel();
        usuarioModel.setUsuario(usuario);
        usuarioModel.setContrasena(contrasenaEncriptada);
        usuarioModel.setCod_verificacion("");
        usuarioModel.setCorreo(correo);
        usuarioModel.setNombre(nombre);
        usuarioModel.setIdentificacion(identificacion);
        usuarioModel.setNum_intentos(0);
        usuarioModel.setEstado(true);
        usuarioModel.setFecha_creacion(fechaColombia);
        userService.guardarUsuario(usuarioModel);

        EmailDTO emailSinEncriptar = new EmailDTO();
        emailSinEncriptar.setAsunto("Confirmación de cuenta");
        emailSinEncriptar.setDestinatario(correo);
        emailSinEncriptar.setUsuario(usuario);
        emailSinEncriptar.setContrasena(contrasena);
        emailService.enviarCorreoRegistro(emailSinEncriptar);

        return Map.of("data", usuarioModel, "msg", "Usuario creado con éxito");
    }
}
