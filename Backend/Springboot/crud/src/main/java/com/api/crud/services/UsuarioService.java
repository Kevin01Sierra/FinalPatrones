package com.api.crud.services;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Optional;
<<<<<<< Updated upstream
=======
import java.util.Random;
>>>>>>> Stashed changes

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.crud.models.UsuarioModel;
import com.api.crud.repositories.IUsuarioRepository;

@Service
public class UsuarioService {
    @Autowired
    IUsuarioRepository userRepository;

    public ArrayList<UsuarioModel> getUser() {
        return (ArrayList<UsuarioModel>) userRepository.findAll();
    }

    public UsuarioModel guardarUsuario(UsuarioModel usuario) {
<<<<<<< Updated upstream
=======
        usuario.setContrasena(hashPassword(usuario.getContrasena())); // contraseña antes de guardarla
>>>>>>> Stashed changes
        return userRepository.save(usuario);
    }

    public Optional<UsuarioModel> getPorId(Long id) {
        return userRepository.findById(id);
    }

    public Optional<UsuarioModel> login(String usuario, String contrasena) {
<<<<<<< Updated upstream
        return userRepository.findByUsuarioAndContrasena(usuario, contrasena);
    }

=======
        Optional<UsuarioModel> usuarioModel = userRepository.findByUsuario(usuario);
        if (usuarioModel.isPresent()) {
            // Verifica la contraseña encriptada
            String hashedPassword = hashPassword(contrasena);
            if (hashedPassword.equals(usuarioModel.get().getContrasena())) {
                return usuarioModel;
            }
        }
        return Optional.empty();
    }

    public Optional<UsuarioModel> buscarUsuario(String usuario) {
        return userRepository.findByUsuario(usuario);
    }

    public String codigoUsuario(Long id) {
        return userRepository.findCodigoForId(id);
    }

    public String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] hashInBytes = md.digest(password.getBytes());
            StringBuilder sb = new StringBuilder();
            for (byte b : hashInBytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error al crear hash MD5", e);
        }
    }

    public String generarContrasenaAleatoria(int longitud) {

        Random random = new Random();
        longitud = 5 + random.nextInt(4);

        String caracteresContrasena = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        StringBuilder contrasena = new StringBuilder(longitud);
        for (int i = 0; i < longitud; i++) {
            int randomIndex = random.nextInt(caracteresContrasena.length());
            contrasena.append(caracteresContrasena.charAt(randomIndex));
        }

        return contrasena.toString();
    }
>>>>>>> Stashed changes
}
