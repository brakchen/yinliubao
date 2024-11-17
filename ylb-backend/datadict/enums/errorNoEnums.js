const ErrorNoEnums = Object.freeze({
    SUCCESS: {
      errno: 0,
      errmsg: "成功"
    },
    UNEXPECTED_ERROR: {
      errno: 20001,
      errmsg: "未预期的错误"
    },
    USER_ALREADY_EXISTS: {
      errno: 30001,
      errmsg: "用户已经存在"
    },
    LOGIN_FAILED: {
      errno: 30002,
      errmsg: "登录失败"
    },
    INVALID_PHONE_OR_PASSWORD: {
      errno: 30003,
      errmsg: "无效的手机号或密码"
    },
    API_NOT_FOUND: {
      errno: 404,
      errmsg: "接口不存在"
    },
    LOGIN_SUCCESS: {
      errno: 0,
      errmsg: "登录成功"
    },
    USER_NOT_FOUND: {
      errno: 30004,
      errmsg: "用户不存在"
    },
    REGISTER_FAILED: {
      errno: 30005,
      errmsg: "注册失败"
    },
    VALIDATE_USER_FAILED: {
      errno: 30006,
      errmsg: "校验用户信息失败"
    },
    INVALID_TOKEN: {
      errno: 401,
      errmsg: "无效的token"
    },
    EXPIRED_TOKEN: {
      errno: 401,
      errmsg: "token已过期"
    },
    // 可以继续添加更多错误码和对应的中文描述
  });
  
  module.exports = ErrorNoEnums;