package RainbowLike.config;


import RainbowLike.repository.MemberRepository;
import RainbowLike.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
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


    private final PasswordEncoderConfig passwordEncoderConfig;

//	protected void configure(HttpSecurity http) throws Exception {
//		http.formLogin().loginPage("/members/login")
//				.defaultSuccessUrl("/")
//				.usernameParameter("id")
//				.passwordParameter("pwd")
//				.successHandler(new AccountLoginSuccessHandler(memberRepository))
//				.failureUrl("/members/login/error")
//				.failureHandler(new AccountLoginFailureHandler()).and().logout()
//				.logoutRequestMatcher(new AntPathRequestMatcher("/members/logout"))
//				.logoutSuccessUrl("/");
//
//		http.authorizeRequests()
//				.mvcMatchers("/admin/**").hasRole("ADMIN")
//				.mvcMatchers("/mypage/**").hasAnyRole("CLIENT", "COUNSELOR")
//				.mvcMatchers("/sweetboard/**").hasAnyRole("COUNSELOR", "ADMIN")
//				.mvcMatchers("/", "/members/**", "/ws/**", "/cons/**", "/board/**", "/boardCons/**", "/mhinfo/**",
//							"/weeNetwork/**", "/mhTest/**","/weeProjectInfo","/weeSymbol","/siteMap").permitAll()
//				.anyRequest().authenticated();
//
//		http.exceptionHandling() // 인증되지 않은 사용자가 리소스에 접근하였을 때 수행되는 핸들러 등록
////	      .authenticationEntryPoint(new CustomAuthenticationEntryPoint())
////	      .accessDeniedHandler(new CustomAccessDeniedHandler());
//				.accessDeniedPage("/error_user");
//	}


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().cors().and()
                .authorizeRequests().anyRequest().permitAll();

//		http.csrf().disable().cors().and()
//		.sessionManagement()
//		.sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
//		.authorizeRequests()
//		.antMatchers(HttpMethod.POST, "/login").permitAll()
//		.anyRequest().authenticated().and()
//		.exceptionHandling()
//		.authenticationEntryPoint(exceptionHandler);
    }


    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(memberService).passwordEncoder(passwordEncoderConfig.passwordEncoder());
    }

//	public void configure(WebSecurity web) throws Exception {
//		web.ignoring().antMatchers("/css/**", "/js/**", "/img/**", "/wee/**", "/images/**", "/error");
//	}

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        config.setAllowedMethods(Arrays.asList("*"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowCredentials(false);
        config.applyPermitDefaultValues();

        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
