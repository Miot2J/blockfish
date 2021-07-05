package com.project.blockfish.config;

import com.project.blockfish.member.service.MyUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final MyUserDetailsService myUserDetailsService;

    private final JwtRequestFilter jwtRequestFilter;

    //@Autowired
    //private CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

    //@Autowired
    //private CustomAccessDeniedHandler customAccessDeniedHandler;

    //토큰이 만료된 상태에서 api를 보내면 로그아웃 시킨다.<<<<<<<<<<<<<< 추가하기
    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .httpBasic()
                //.authenticationEntryPoint(customAuthenticationEntryPoint)
                //.and()
                //.exceptionHandling().accessDeniedHandler(customAccessDeniedHandler)
                .and()
                .authorizeRequests()
                .antMatchers("/user/signup").permitAll()
                .antMatchers("/user/mail").permitAll()
                .antMatchers("/user/login").permitAll()
                .antMatchers("/user/logout").permitAll()
                .antMatchers("/user/verify/**").permitAll()
                .antMatchers("/file/test").permitAll()
                .antMatchers("/oauth/**").permitAll() //이 윗 부븐들은 모두 허용
                .antMatchers("/file/upload").hasRole("USER")
                .antMatchers("/test/user").hasRole("USER") //아래 두개는 권한이 필요
                .antMatchers("/test/admin").hasRole("ADMIN")
                .anyRequest().authenticated();

        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Override // ignore check swagger resource
    public void configure(WebSecurity web) {
        web.ignoring().antMatchers("/v2/api-docs", "/swagger-resources/**",
                "/swagger-ui.html", "/webjars/**", "/swagger/**");
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

}
