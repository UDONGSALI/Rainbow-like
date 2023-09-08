package RainbowLike.config;

import RainbowLike.component.AuthEntryPoint;
import RainbowLike.component.AuthenticationFilter;
import RainbowLike.repository.MemberRepository;
import RainbowLike.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    MemberService memberService;
    @Autowired
    MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private AuthEntryPoint exceptionHandler;

    @Autowired
    private AuthenticationFilter authenticationFilter;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // CSRF 보호 비활성화, CORS 활성화 및 세션 관리를 STATELESS로 설정
        http.csrf().disable().cors().and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests()
                // 접근 권한을 모두 허용
                .antMatchers("/**").permitAll()
                .antMatchers(HttpMethod.POST, "/login").permitAll()
                // "/api/*" 엔드포인트에 대한 접근 권한을 "ADMIN" 역할을 가진 사용자로 설정
                // .antMatchers("/api/").hasRole("ADMIN")
                // 모든 다른 요청은 인증된 사용자만 접근 가능
                .anyRequest().authenticated().and()
                .exceptionHandling()
                .authenticationEntryPoint(exceptionHandler).and()
                // AuthenticationFilter를 UsernamePasswordAuthenticationFilter 앞에 추가
                .addFilterBefore(authenticationFilter,
                        UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("*"));
        config.setAllowedMethods(Arrays.asList("*"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowCredentials(false);
        config.applyPermitDefaultValues();

        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth)
            throws Exception {
        // 사용자 정보를 가져오는 UserDetailsService와 비밀번호 인코더 설정
        auth.userDetailsService(memberService).passwordEncoder(passwordEncoder);
    }

    @Bean
    public AuthenticationManager getAuthenticationManager() throws
            Exception {
        return authenticationManager();
    }
}
