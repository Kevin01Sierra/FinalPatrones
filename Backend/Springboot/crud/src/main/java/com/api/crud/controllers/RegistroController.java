package com.api.crud.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;
import com.api.crud.DTO.Request.RegistroPersonaRequest;
import com.api.crud.DTO.Response.RegistroResponse;
import com.api.crud.models.TipoUsuarioUsuarioModel;
import com.api.crud.models.UsuarioModel;
import com.api.crud.services.Encriptar;
import com.api.crud.services.IEmailService;
import com.api.crud.services.ManejarFechas;
import com.api.crud.services.TipoUsuarioService;
import com.api.crud.services.TipoUsuarioUsuarioService;
import com.api.crud.services.UsuarioService;
import com.api.crud.services.models.EmailDTO;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("")
public class RegistroController {
    @Autowired
    private UsuarioService userService;

    @Autowired
    private TipoUsuarioService tipoUsuarioService;

    @Autowired
    private TipoUsuarioUsuarioService tipoUsuarioUsuarioService;

    @Autowired
    private IEmailService emailService;

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

        String contrasena = Encriptar.generarContrasena();

        String contrasenaEncriptada = Encriptar.encriptarContrasena(contrasena);

        UsuarioModel usuarioModel = new UsuarioModel();
        usuarioModel.setUsuario(usuario);
        usuarioModel.setContrasena(contrasenaEncriptada);
        usuarioModel.setCod_verificacion("");
        usuarioModel.setCorreo(correo);
        usuarioModel.setNombre(nombre);
        usuarioModel.setIdentificacion(identificacion);
        usuarioModel.setNum_intentos(0);
        usuarioModel.setEstado(true);
        usuarioModel.setFecha_creacion(ManejarFechas.obtenerFechaActual());
        usuarioModel.setActivo(true);
        userService.guardarUsuario(usuarioModel);

        Optional<UsuarioModel> usuarioAgregado = userService.buscarUsuario(usuario);
        TipoUsuarioUsuarioModel tipo = new TipoUsuarioUsuarioModel();
        tipo.setUsuario_fk(usuarioAgregado.get().getId());
        Long idTipoCliente = tipoUsuarioService.obtenerIdCliente();
        tipo.setTipo_usuario_fk(idTipoCliente);
        tipoUsuarioUsuarioService.guardarTipoUsuarioUsuario(tipo);

        EmailDTO email = new EmailDTO();
        email.setAsunto("Confirmación de cuenta");
        email.setDestinatario(correo);
        email.setUsuario(usuario);
        email.setContrasena(contrasena);
        emailService.enviarCorreoRegistro(email);

        RegistroResponse registro = new RegistroResponse();
        registro.setId(usuarioAgregado.get().getId());
        registro.setNombre(nombre);
        registro.setCorreo(correo);
        registro.setEstado(true);
        registro.setTipo(tipoUsuarioService.obtenerTipo(idTipoCliente).get());
        registro.setActivo(true);

        return Map.of("data", registro, "msg", "Usuario creado con exito");
    }
}
