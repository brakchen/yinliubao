package com.ylb.ylbbackend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health")
public class HealthController {


    @RequestMapping(value = "/check",method = RequestMethod.GET)
    @ResponseBody
    public String health() {
        return "OK";
    }
}
