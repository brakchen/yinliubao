package com.ylb.ylbbackend.enums.response;

public enum UserEnum implements ErrorEnum {
    USER_EXIST(601,"用户已存在"),
    USER_NOT_EXIST(602,"用户名不存在"),
    PASSWORD_INCORRECT(603,"密码错误"),


    ;
    private Integer code;
    private String message;

    private UserEnum(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    @Override
    public Integer getCode() {
        return this.code;
    }

    @Override
    public String getMessage() {
        return this.message;
    }
}
