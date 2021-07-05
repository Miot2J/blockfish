package com.project.blockfish.member.service;

import com.project.blockfish.member.Member;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    public final static long TOKEN_VALIDATION_SECOND = 1000L * 10 * 1000; //포스트맨은 gmt로 인식하여 만료시간 오류 나중에 뒤에 3지우면 됨
    public final static long REFRESH_TOKEN_VALIDATION_SECOND = 1000L * 60 * 24 * 2;

    final static public String ACCESS_TOKEN_NAME = "accessToken";
    final static public String REFRESH_TOKEN_NAME = "refreshToken";

    @Value("${spring.jwt.secret}")
    private String SECRET_KEY;

    private Key getSigningKey(String secretKey) {
        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private String doGenerateToken(String userId, long expireTime) { //토큰을 생성, 페이로드에 담길 값은 userId

        Claims claims = Jwts.claims();
        claims.put("username", userId);

        String jwt = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expireTime))
                .signWith(getSigningKey(SECRET_KEY), SignatureAlgorithm.HS256)
                .compact();
        return jwt;
    }

    public String generateToken(Member member) { //Access Token 생성
        return doGenerateToken(member.getUserId(), TOKEN_VALIDATION_SECOND);
    }

    public String generateRefreshToken(Member member) { //refresh token 생성
        return doGenerateToken(member.getUserId(), REFRESH_TOKEN_VALIDATION_SECOND);
    }

    public Claims extractAllClaims(String token) throws ExpiredJwtException { //토큰이 유효한 토큰인지 검사한 후, 토큰에 담긴 Payload 값을 가져온다.
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey(SECRET_KEY))
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String getUserId(String token) { // 추출한 Payload부터 userId를 가져온다.
        System.out.println("token!! = " + token);
        System.out.println("extractAllClaims(token)" + extractAllClaims(token).get("username", String.class));
        return extractAllClaims(token).get("username", String.class);
    }

    public Boolean isTokenExpired(String token) { //토큰이 만료되었는지 확인
        final Date expiration = extractAllClaims(token).getExpiration(); //getExpiration은 JWT claims에서 지원해준다
        return expiration.before(new Date());
    }


    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUserId(token);

        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token)); //
    }
}
