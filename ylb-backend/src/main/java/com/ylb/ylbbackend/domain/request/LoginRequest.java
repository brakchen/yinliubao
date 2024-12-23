package com.ylb.ylbbackend.domain.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {

    @NotNull(message = "username cannot be null")
    private String username;


    @NotNull(message = "password cannot be null")
    private String password;
}
