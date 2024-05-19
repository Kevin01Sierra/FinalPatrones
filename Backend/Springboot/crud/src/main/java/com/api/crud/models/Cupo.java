package com.api.crud.models;

import javax.persistence.*;
import java.sql.Timestamp;

@Table(name = "Cupo")
@Entity
public class Cupo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String status;
    private Long userId;
    private Timestamp reservedAt;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Timestamp getReservedAt() {
        return reservedAt;
    }

    public void setReservedAt(Timestamp reservedAt) {
        this.reservedAt = reservedAt;
    }
}
