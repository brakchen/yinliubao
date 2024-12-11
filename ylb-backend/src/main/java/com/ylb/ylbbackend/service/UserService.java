package com.ylb.ylbbackend.service;


import com.ylb.ylbbackend.domain.entities.User;
import com.ylb.ylbbackend.domain.request.LoginRequest;
import com.ylb.ylbbackend.domain.request.RegisterRequest;
import com.ylb.ylbbackend.domain.response.Response;
import com.ylb.ylbbackend.domain.response.user.LoginResponse;
import com.ylb.ylbbackend.repository.UsersRepository;
import jakarta.annotation.Resource;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

import static com.ylb.ylbbackend.enums.response.UserEnum.*;

@Service
public class UserService {

    @Resource
    private UsersRepository usersRepository;

    @Resource
    private PasswordEncoder passwordEncoder;

    public List<User> findAll() {
        return usersRepository.findAll();
    }


    public Response<LoginResponse> login(LoginRequest loginRequest) {
        User user = usersRepository.findByUsername(loginRequest.getUsername());
        if(Objects.isNull(user)){
            return Response.error(USER_NOT_EXIST);
        }
        if(!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
            return Response.error(PASSWORD_INCORRECT);
        }
        //fixme 这里需要填充权限
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        Authentication authentication =
                new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword());
        context.setAuthentication(authentication);

        SecurityContextHolder.setContext(context);

        return Response.ok();

    }

    public Response<Void> register(RegisterRequest loginRequest) {
        User user = usersRepository.findByUsername(loginRequest.getUsername());
        if(Objects.nonNull(user)) {
            return Response.error(USER_EXIST);
        }

        user = new User();
        user.setUsername(loginRequest.getUsername());
        user.setPassword(passwordEncoder.encode(loginRequest.getPassword()));
        usersRepository.save(user);
        return Response.ok();

    }
    public Response<Void> logout() {


        return Response.ok();

    }

}