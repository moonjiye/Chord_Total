package com.projectBackend.project.security;

import com.projectBackend.project.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@Component
public class WebSecurityConfig implements WebMvcConfigurer {
    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint; // 인증 실패 시 처리할 클래스
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler; // 인가 실패 시 처리할 클래스
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // BCrypt 암호화 객체를 Bean으로 등록
    }

    @Bean // SecurityFilterChain 객체를 Bean으로 등록
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http

                .httpBasic()
                .and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)
                .and()
                .authorizeRequests()


                .antMatchers("/music/musiclist", "/music/detail/{id}" , "/music/search").permitAll()
                .antMatchers("/favicon.ico","/manifest.json").permitAll()
                .antMatchers("/musiccomment/list/{musicId}").permitAll()
                .antMatchers("/music/list/page", "/music/list/count").permitAll()
                .antMatchers("/product", "/product/productlist", "/product/productlist/{artist}", "/product/search").permitAll()
                .antMatchers("/news/**").permitAll()
                .antMatchers("/sms/**", "/api/**", "/ws/**").permitAll()
                .antMatchers("/performance/list", "/performance/list/page", "/performance/list/count",  "/ticketer/**", "/performance/userListNoToken").permitAll()
                .antMatchers("/auth/**", "/main/**").permitAll()
                .antMatchers( "/", "/static/**").permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                .antMatchers("/v2/api-docs", "/swagger-resources/**", "/swagger-ui.html", "/webjars/**", "/swagger/**", "/sign-api/exception").permitAll()
                .anyRequest().authenticated()
                .and()
                .apply(new JwtSecurityConfig(tokenProvider))
                .and()
                .cors(); // .and().cors() 추가 된 부분

        return http.build();
    }
    @Override  // 메소드 오버라이딩, localhost:3000 번으로 들어오는 요청 허가
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(false);
    }
}
