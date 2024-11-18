const ErrorNoEnums = Object.freeze({
    SUCCESS: {
        code: 0,
        message: "成功"
    },
    UNEXPECTED_ERROR: {
        code: 20001,
        message: "未预期的错误"
    },
    USER_ALREADY_EXISTS: {
        code: 30001,
        message: "用户已经存在"
    },
    LOGIN_FAILED: {
        code: 30002,
        message: "登录失败"
    },
    INVALID_PHONE_OR_PASSWORD: {
        code: 30003,
        message: "无效的手机号或密码"
    },
    API_NOT_FOUND: {
        code: 404,
        message: "接口不存在"
    },
    LOGIN_SUCCESS: {
        code: 0,
        message: "登录成功"
    },
    USER_NOT_FOUND: {
        code: 30004,
        message: "用户不存在"
    },
    REGISTER_FAILED: {
        code: 30005,
        message: "注册失败"
    },
    VALIDATE_USER_FAILED: {
        code: 30006,
        message: "校验用户信息失败"
    },
    INVALID_URL: {
        code: 40001,
        message: "无效url"
    },
    SERVER_INTERNAL_ERROR: {
        code: 5001,
        message: "系统错误"
    },
    INVALID_TOKEN: {
      code: 401,
      message: "无效的token"
    },
    EXPIRED_TOKEN: {
      code: 401,
      message: "token已过期"
    },
    // 可以继续添加更多错误码和对应的中文描述
});

module.exports = ErrorNoEnums;