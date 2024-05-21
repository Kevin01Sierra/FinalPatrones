package com.api.crud.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.api.crud.models.CupoOfflineModel;

@Repository
public interface ICupoOfflineRepository extends JpaRepository<CupoOfflineModel, Long> {
    
    @Query("SELECT COUNT(c) FROM CupoOfflineModel c JOIN VehiculoModel v ON c.vehiculo_fk = v.id WHERE c.parqueadero_fk = :parqueaderoId AND v.tipo = :vehicleType")
    int countByParqueaderoIdAndVehicleType(@Param("parqueaderoId") long parqueaderoId, @Param("vehicleType") String vehicleType);
}