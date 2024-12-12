package com.ylb.ylbbackend.repository;

import com.ylb.ylbbackend.domain.entities.Permission;
import com.ylb.ylbbackend.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionsRepository extends JpaRepository<Permission, Integer> {



}
