package com.ylb.ylbbackend.enums.response;

public enum CommonEnum implements ErrorEnum {
    OK(0,"SUCCESS"),
    UNEXPECTED(500,"UNEXPECTED"),


    ;
    private Integer code;
    private String message;

    private CommonEnum(Integer code, String message) {
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
