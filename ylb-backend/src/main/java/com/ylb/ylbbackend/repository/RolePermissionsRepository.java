package com.ylb.ylbbackend.repository;

import com.ylb.ylbbackend.domain.entities.RolePermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolePermissionsRepository extends JpaRepository<RolePermission, Integer> {



}
