package com.ylb.ylbbackend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ylb.ylbbackend.domain.entities.Role;
import com.ylb.ylbbackend.domain.entities.User;
import com.ylb.ylbbackend.domain.entities.UserRole;
import com.ylb.ylbbackend.repository.RolePermissionsRepository;
import com.ylb.ylbbackend.repository.RolesRepository;
import com.ylb.ylbbackend.repository.UserRolesRepository;
import com.ylb.ylbbackend.repository.UsersRepository;
import jakarta.annotation.Resource;
import jakarta.persistence.EntityManager;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Slf4j
public class CurrentUserDetailsService implements UserDetailsService {
    @Resource
    private UsersRepository usersRepository;

    @Resource
    private EntityManager entityManager;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String hql = "select u from User u " +
                "left join fetch u.roles r " +
                "left join fetch r.permissions p " +
                "where u.username = :username";
        Optional<User> user =  entityManager.createQuery(hql, User.class)
                .setParameter("username", username)
                .getResultStream().findFirst();
        return user.map(value -> new UserDetails() {
            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                Set<Role> roles = value.getRoles();
                try {
                    log.info("roles:{}", new ObjectMapper().writeValueAsString(roles));
                } catch (JsonProcessingException e) {
                    throw new RuntimeException(e);
                }
                return roles.stream()
                        .map(Role::getPermissions)
                        .flatMap(Set::stream)
                        .map(permission -> new SimpleGrantedAuthority("PERMISSION_" + permission.getName()))
                        .collect(Collectors.toList());
            }

            @Override
            public String getPassword() {
                return value.getPassword();
            }

            @Override
            public String getUsername() {
                return value.getUsername();
            }
        }).orElse(null);
    }
}
