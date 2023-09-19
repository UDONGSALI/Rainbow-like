package RainbowLike.service;

import RainbowLike.constant.Type;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtService {
	static final long EXPIRATIONTIME = 86400000; // 토큰 만료 시간: 1일 (1 day in ms)
	static final String PREFIX = "Bearer"; // JWT 토큰의 접두사
	static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256); // 서명 키 생성

	// 사용자의 username과 role 정보를 바탕으로 JWT 토큰을 생성하고 반환합니다.
	public String getToken(String memId, String role) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("role", role);

		String token = Jwts.builder()
				.setClaims(claims)
				.setSubject(memId)
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
				.signWith(key)
				.compact();
		System.out.println("토큰 생성: " + token);
		return token;
	}

	// HTTP 요청의 헤더에서 JWT 토큰을 추출하고, 유효성을 검사하여 사용자 정보(Claims)를 반환합니다.
	public Claims getAuthUser(HttpServletRequest request) {
		String token = request.getHeader(HttpHeaders.AUTHORIZATION);

		if (token != null) {
			// JWT 토큰을 파싱하고 검증합니다.
			Jws<Claims> claims = Jwts.parserBuilder()
					.setSigningKey(key)
					.build()
					.parseClaimsJws(token.replace(PREFIX, ""));

			Claims body = claims.getBody();

			String bodyJson = body.toString();
			System.out.println("JWT 본문: " + bodyJson);

			if (body != null)
				return body;
		}
		return null;
	}
}