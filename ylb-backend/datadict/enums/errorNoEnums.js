const ErrorNoEnums = Object.freeze({
    SUCCESS: {
      errno: 0,
      errormsg: "成功"
    },
    UNEXPECTED_ERROR: {
      errno: 20001,
      errormsg: "未预期的错误"
    },
    USER_ALREADY_EXISTS: {
      errno: 30001,
      errormsg: "用户已经存在"
    },
    LOGIN_FAILED: {
      errno: 30002,
      errormsg: "登录失败"
    },
    INVALID_PHONE_OR_PASSWORD: {
      errno: 30003,
      errormsg: "无效的手机号或密码"
    },
    API_NOT_FOUND: {
      errno: 404,
      errormsg: "接口不存在"
    },
    LOGIN_SUCCESS: {
      errno: 0,
      errormsg: "登录成功"
    }
    // 可以继续添加更多错误码和对应的中文描述
  });
  
  module.exports = ErrorNoEnums;