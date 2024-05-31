package com.api.crud.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.api.crud.models.CupoModel;


import java.util.Optional;

@Repository
public interface ICupoRepository extends JpaRepository<CupoModel, Long> {
    Optional<CupoModel> findByCodigoAndEstado(String codigo, CupoModel.Estado status);

    Optional<CupoModel> findByIdAndEstado(Long id, CupoModel.Estado status);

    Optional<CupoModel> findByCodigo(String Codigo);

    @Query("SELECT COUNT(c) FROM CupoModel c JOIN VehiculoModel v ON c.vehiculo_fk = v.id WHERE c.parqueadero_fk = :parqueaderoId AND v.tipo = :vehicleType")
    int countByParqueaderoIdAndVehiculoTipo(@Param("parqueaderoId") long parqueaderoId,
            @Param("vehicleType") String vehicleType);

    @Query("SELECT v.tipo FROM VehiculoModel v WHERE v.id = :vehicleId")
    String findVehicleTypeById(@Param("vehicleId") long vehicleId);

    List<CupoModel> findByActivo(boolean activo);

    @Query(value = "SELECT * FROM CUPO WHERE estado = 'RESERVADO' AND parqueadero_fk = ?1 AND vehiculo_fk = ?2", nativeQuery = true)
    List<CupoModel> findByParqueaderoAndVehiculoReservado(Long parqueaderoId, Long vehiculoId);

    @Query(value = "SELECT * FROM CUPO WHERE estado = 'OCUPADO' AND parqueadero_fk = ?1 AND vehiculo_fk = ?2", nativeQuery = true)
    List<CupoModel> findByParqueaderoAndVehiculoOcupado(Long parqueaderoId, Long vehiculoId);

    @Query(value = "SELECT * FROM CUPO WHERE usuario_fk = ?1", nativeQuery = true)
    List<CupoModel> buscarByUsuario(Long usuario_fk);
    

}
