package com.api.crud.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.api.crud.models.FacturaModel;

@Repository
public interface IFacturaRepository extends JpaRepository<FacturaModel, Long> {

    @Query("SELECT SUM(f.valorTotal) FROM FacturaModel f JOIN VehiculoModel v on f.vehiculoId = v.id WHERE f.parqueaderoId = :parqueaderoId AND v.tipo = :vehiculoTipo")
    Integer sumByParqueaderoIdAndVehiculoTipo(@Param("parqueaderoId") long parqueaderoId, @Param("vehiculoTipo") String vehiculoTipo);
}