package com.ylb.ylbbackend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ylb.ylbbackend.domain.request.LoginRequest;
import com.ylb.ylbbackend.domain.request.RegisterRequest;
import com.ylb.ylbbackend.domain.response.Response;
import com.ylb.ylbbackend.domain.response.user.LoginResponse;
import com.ylb.ylbbackend.service.UserService;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    private UserService userService;

    @RequestMapping(value = "findAll",method = RequestMethod.GET)
    @ResponseBody
    public String findAll() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(userService.findAll());
    }





    @RequestMapping(value = "/login",method = RequestMethod.POST)
    @ResponseBody
    public Response<LoginResponse> login(@RequestBody @Valid LoginRequest request) {
        return userService.login(request);

    }


    @RequestMapping(value = "/register",method = RequestMethod.POST)
    @ResponseBody
    public Response<Void> register(@RequestBody @Valid RegisterRequest request){
       return userService.register(request);
    }


    @RequestMapping(value = "/logout",method = RequestMethod.POST)
    @ResponseBody
    public Response<Void> logout() {
        return userService.logout();

    }
}
