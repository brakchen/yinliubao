//package com.ylb.ylbbackend.config.filter;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.ylb.ylbbackend.domain.request.LoginRequest;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.SneakyThrows;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//import java.io.IOException;
//import java.util.HashMap;
//
//@Slf4j
//public class YLBLoginFilter extends UsernamePasswordAuthenticationFilter {
//
//
//    private final RedisUtils redisUtils;
//
//    private final Long expiration;
//
//    public YLBLoginFilter(AuthenticationManager authenticationManager, RedisUtils redisUtils, Long expiration) {
//        this.expiration = expiration;
//        this.redisUtils = redisUtils;
//        super.setAuthenticationManager(authenticationManager);
//        super.setPostOnly(true);
//        super.setFilterProcessesUrl("/auth/login");
//        super.setUsernameParameter("userId");
//        super.setPasswordParameter("userPassword");
//    }
//
//    @SneakyThrows
//    @Override
//    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
//        log.info("YLBLoginFilter authentication start");
//        // 数据是通过 RequestBody 传输
//        ObjectMapper objectMapper = new ObjectMapper();
//        LoginRequest loginRequest = objectMapper.readValue(request.getInputStream(), LoginRequest.class);
//        UserLoginDTO user = JSON.parseObject(request.getInputStream(), StandardCharsets.UTF_8, UserLoginDTO.class);
//
//        return super.getAuthenticationManager().authenticate(
//                new UsernamePasswordAuthenticationToken(user.getUserId(), user.getUserPassword())
//        );
//    }
//
//    @Override
//    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
//                                            FilterChain chain,
//                                            Authentication authResult) {
//        log.info("YaLoginFilter authentication success: {}", authResult);
//        // 如果验证成功, 就生成Token并返回
//        UserDetails userDetails = (UserDetails) authResult.getPrincipal();
//        String userId = userDetails.getUsername();
//        String token = JwtUtils.generateToken(userId);
//        response.setHeader(TOKEN_HEADER, TOKEN_PREFIX + token);
//        // 将token存入Redis中
//        redisUtils.set(REDIS_KEY_AUTH_TOKEN + userId, token, expiration);
//        log.info("YaLoginFilter authentication end");
//        // 将UserDetails存入redis中
//        redisUtils.set(REDIS_KEY_AUTH_USER_DETAIL + userId, JSON.toJSONString(userDetails), 1, TimeUnit.DAYS);
//
//        ServletUtils.renderResult(response, new BaseResult<>(ResultEnum.SUCCESS.code, "登陆成功"));
//        log.info("YaLoginFilter authentication end");
//    }
//
//    /**
//     * 如果 attemptAuthentication 抛出 AuthenticationException 则会调用这个方法
//     */
//    @Override
//    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
//                                              AuthenticationException failed) throws IOException {
//        log.info("YaLoginFilter authentication failed: {}", failed.getMessage());
//        ServletUtils.renderResult(response, new BaseResult<>(ResultEnum.FAILED_UNAUTHORIZED.code, "登陆失败：" + failed.getMessage()));
//    }
//}
