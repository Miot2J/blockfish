package com.project.blockfish.config;

import com.project.blockfish.member.Member;
import com.project.blockfish.member.service.CookieUtil;
import com.project.blockfish.member.service.JwtUtil;
import com.project.blockfish.member.service.MyUserDetailsService;
import com.project.blockfish.member.service.RedisUtil;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {

    private final MyUserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;
    private final CookieUtil cookieUtil;
    private final RedisUtil redisUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final Cookie jwtToken = cookieUtil.getCookie(request, JwtUtil.ACCESS_TOKEN_NAME);

        String userId = null;
        String jwt = null;
        String refreshJwt = null;
        String refreshUserId = null;

        try{
           if(jwtToken != null) {
               jwt = jwtToken.getValue();
               userId = jwtUtil.getUserId(jwt);
           }

           if(userId!=null) {
               UserDetails userDetails = userDetailsService.loadUserByUsername(userId);

               if(jwtUtil.validateToken(jwt, userDetails)) {
                   UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                   usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                   SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
               }
           }
        } catch (ExpiredJwtException e) {
            Cookie refreshToken = cookieUtil.getCookie(request, JwtUtil.REFRESH_TOKEN_NAME);
            if(refreshToken!=null) {
                refreshJwt = refreshToken.getValue();
            }
        } catch (Exception e){

        }

        try{
            if(refreshJwt != null){
                refreshUserId = redisUtil.getData(refreshJwt);

                if(refreshUserId.equals(jwtUtil.getUserId(refreshJwt))){
                    UserDetails userDetails = userDetailsService.loadUserByUsername(refreshUserId);
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);

                    Member member = new Member();
                    member.setUserId(refreshUserId);
                    String newToken =jwtUtil.generateToken(member);

                    Cookie newAccessToken = cookieUtil.createCookie(JwtUtil.ACCESS_TOKEN_NAME, newToken, JwtUtil.TOKEN_VALIDATION_SECOND);
                    response.addCookie(newAccessToken);
                }
            }
        } catch(ExpiredJwtException e){

        }

        filterChain.doFilter(request, response);

    }
}
