package com.api.crud.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import com.api.crud.models.VehiculoModel;

public interface IVehiculoRepository extends JpaRepository<VehiculoModel, Long> {

    List<VehiculoModel> findByActivo(boolean activo);

    @Query("SELECT v.id FROM VehiculoModel v WHERE v.tipo = :vehicleName")
    Long findVehicleTypeByName(@Param("vehicleName") String vehicleName);
}
