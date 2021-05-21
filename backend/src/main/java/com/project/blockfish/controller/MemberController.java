package com.project.blockfish.controller;

import com.project.blockfish.businesslogic.domain.Member;
import com.project.blockfish.businesslogic.service.*;
import com.project.blockfish.businesslogic.response.Response;
import com.project.blockfish.businesslogic.request.RequestLoginUser;
import com.project.blockfish.businesslogic.request.RequestVerifyEmail;
import javassist.NotFoundException;
import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class MemberController {
    private static final Logger logger = LoggerFactory.getLogger(MemberController.class);

    private final AuthService authService;
    private final JwtUtil jwtUtil;
    private final CookieUtil cookieUtil;
    private final RedisUtil redisUtil;
    private final EmailService emailService;

    @PostMapping("/signup")
    public Response signUpUser(@RequestBody Member member) {
        Response response = new Response();
        System.out.println("Member");
        System.out.println(member);
        Logger logger = LoggerFactory.getLogger(this.getClass());
        logger.debug("Select Start");
        try{
            authService.signUpUser(member);
            response.setResponse("success");
            response.setMessage("회원가입을 성공적으로 완료했습니다.");
        } catch(Exception e){
            response.setResponse("fail");
            response.setMessage("회원가입을 하는 도중 오류가 발생했습니다.");
            response.setData(e.toString());
        }
        return response;
    }

    @PostMapping("/verify")
    public Response verify(@RequestBody RequestVerifyEmail requestVerifyEmail, HttpServletRequest req, HttpServletResponse res) throws NotFoundException {
        Response response;
        try {
            Member member = authService.findByUserId(requestVerifyEmail.getUserId());
            authService.sendVerificationMail(member);
            response = new Response("success", "성공적으로 인증메일을 보냈습니다.", null);
        } catch (Exception exception) {
            response = new Response("error", "인증메일을 보내는데 문제가 발생했습니다.", exception);
        }
        return response;
    }

    @GetMapping("/verify/{key}")
    public Response getVerify(@PathVariable String key) {
        Response response;
        try {
            authService.verifyEmail(key);
            response = new Response("success", "성공적으로 인증메일을 확인했습니다.", null);

        } catch (Exception e) {
            response = new Response("error", "인증메일을 확인하는데 실패했습니다.", null);
        }
        return response;
    }

    @PostMapping("/login")
    public Response login(@RequestBody RequestLoginUser user,
                          HttpServletRequest req,
                          HttpServletResponse res) throws Exception {
        try {
            System.out.println(user.getUserId()+" "+user.getPassword());
            final Member member = authService.loginUser(user.getUserId(), user.getPassword());
            System.out.println(member);
            final String token = jwtUtil.generateToken(member); //access token 발급
            System.out.println("token = " + token);
            final String refreshJwt = jwtUtil.generateRefreshToken(member); //refresh token 발급
            System.out.println("refreshJwt = " + refreshJwt);
            Cookie accessToken = cookieUtil.createCookie(JwtUtil.ACCESS_TOKEN_NAME, token, JwtUtil.TOKEN_VALIDATION_SECOND);
            System.out.println("accessToken = " + accessToken);
            Cookie refreshToken = cookieUtil.createCookie(JwtUtil.REFRESH_TOKEN_NAME, refreshJwt, JwtUtil.REFRESH_TOKEN_VALIDATION_SECOND);
            System.out.println("refreshToken = " + refreshToken);
            System.out.println("refreshJwt = " + refreshJwt);
            redisUtil.setDataExpire(refreshJwt, member.getUserId(), JwtUtil.REFRESH_TOKEN_VALIDATION_SECOND);
            res.addCookie(accessToken); //access, refresh token 쿠키에 담기
            res.addCookie(refreshToken);
            System.out.println("redisUtil.getData(refreshJwt); = " + redisUtil.getData(refreshJwt));
            return new Response("success", "로그인에 성공했습니다.", member);
        } catch (Exception e) {
            return new Response("error", "로그인에 실패했습니다.", e.getMessage());
        }
    }



    @PostMapping("/logout")
    public Response logout(@RequestHeader(value="accessToken") String accessToken,
                           @RequestHeader(value="refreshToken") String refreshToken,
                           HttpServletRequest req, HttpServletResponse res) {
        try{
            System.out.println("accessToken = " + accessToken);
            System.out.println("refreshToken = " + refreshToken);
            Cookie accessTokenDelete = cookieUtil.createCookie(JwtUtil.ACCESS_TOKEN_NAME, null, 0);
            Cookie refreshTokenDelete = cookieUtil.createCookie(JwtUtil.REFRESH_TOKEN_NAME, null, 0);
            System.out.println("accessTokenDelete = " + accessTokenDelete);
            System.out.println("refreshTokenDelete = " + refreshTokenDelete);
            String userId = jwtUtil.getUserId(accessToken);
            System.out.println("userId = " + userId);
            redisUtil.deleteData(refreshToken);
            System.out.println("3");
            redisUtil.setDataExpire(accessToken, userId, JwtUtil.TOKEN_VALIDATION_SECOND); //블랙리스트로 access 토큰 추가
            System.out.println("4");
            res.addCookie(accessTokenDelete);
            System.out.println("5");
            res.addCookie(refreshTokenDelete);
            System.out.println("6");
           return new Response("success", "로그아웃에 성공했습니다", userId);
        } catch (Exception e) {
            return new Response("error", "로그아웃에 실패했습니다.", e.getMessage());
        }

    }

    @PostMapping("/duplicate")
    public Response duplicate(@RequestBody Member member) {
        Response response = new Response();
        try{
            Member selectMember = authService.findByUserId(member.getUserId());
            response.setResponse("fail");
        } catch(Exception e){
            response.setResponse("success");
        }
        return response;
    }



}
