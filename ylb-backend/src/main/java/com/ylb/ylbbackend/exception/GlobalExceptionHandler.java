package com.ylb.ylbbackend.exception;

import com.ylb.ylbbackend.domain.response.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;

import static com.ylb.ylbbackend.enums.response.CommonEnum.UNEXPECTED;
import static com.ylb.ylbbackend.enums.response.UserEnum.USER_NOT_EXIST;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ResponseEntity<Response<Void>> handleException(Exception e) {
        log.error("",e);
        return new ResponseEntity<>( Response.error(UNEXPECTED), HttpStatus.OK);
    }


    @ExceptionHandler(UsernameNotFoundException.class)
    @ResponseBody
    public ResponseEntity<Response<Void>> handleUsernameNotFoundException(Exception e) {
        log.error("",e);
        return new ResponseEntity<>( Response.error(USER_NOT_EXIST), HttpStatus.OK);
    }
}
