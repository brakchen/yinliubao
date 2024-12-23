package com.ylb.ylbbackend.repository;

import com.ylb.ylbbackend.domain.entities.Role;
import com.ylb.ylbbackend.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolesRepository extends JpaRepository<Role, Integer> {




}
