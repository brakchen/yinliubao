package com.ylb.ylbbackend.domain.response;

import com.ylb.ylbbackend.enums.response.ErrorEnum;
import lombok.Data;

import static com.ylb.ylbbackend.enums.response.CommonEnum.OK;

@Data
public class Response<T> {
    private int code;
    private String msg;
    private T data;

    public Response(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public Response(int code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }



    public Response(ErrorEnum errorEnum) {
        this.code = errorEnum.getCode();
        this.msg = errorEnum.getMessage();
        this.data = null;
    }

    public Response(ErrorEnum errorEnum, T data) {
        this.code = errorEnum.getCode();
        this.msg = errorEnum.getMessage();
        this.data = data;
    }
    public static <T> Response<T> ok() {
        return new Response<>(OK);
    }

    public static <T> Response<T> ok(T data) {
        return new Response<>(OK,data);
    }

    public static <T> Response<T> error(ErrorEnum errorEnum) {
        return new Response<>(errorEnum);
    }

}
