package com.ylb.ylbbackend.repository;

import com.ylb.ylbbackend.domain.entities.User;
import com.ylb.ylbbackend.domain.entities.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRolesRepository extends JpaRepository<UserRole, Integer> {


    List<UserRole> findByUserId(Long userId);
}
