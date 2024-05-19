package com.api.crud.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.crud.models.UsuarioModel;

@Repository

public interface IUsuarioRepository extends JpaRepository<UsuarioModel, Long> {
<<<<<<< Updated upstream
    Optional<UsuarioModel> findByUsuarioAndContrasena(String usuario,String contrasena);
=======

    Optional<UsuarioModel> findByUsuarioAndContrasena(String usuario, String contrasena); // no estoy seguro de si esto
                                                                                          // es necesario

    Optional<UsuarioModel> findByUsuario(String usuario);

    @Query(value = "Select Cod_verificacion from usuario where Id = ?1", nativeQuery = true)
    String findCodigoForId(Long id);
>>>>>>> Stashed changes
}
