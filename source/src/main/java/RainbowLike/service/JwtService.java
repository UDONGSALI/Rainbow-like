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
	static final long EXPIRATIONTIME = 86400000; // 1 day in ms
	static final String PREFIX = "Bearer";
	// Generate secret key. Only for the demonstration
	// You should read it from the application configuration
	static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

	// Generate JWT token
	public String getToken(String username, String role) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("role", role);

		String token = Jwts.builder()
				.setClaims(claims)
				.setSubject(username)
			  	.setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
			  	.signWith(key)
			  	.compact();
		System.out.println("토큰" + token);
		return token;
  }

	// Get a token from request Authorization header,
	// parse a token and get username
	public Claims getAuthUser(HttpServletRequest request) {
		String token = request.getHeader(HttpHeaders.AUTHORIZATION);

		if (token != null) {
//			String user = Jwts.parserBuilder()
//					.setSigningKey(key)
//					.build()
//					.parseClaimsJws(token.replace(PREFIX, ""))
//					.getBody()
//					.getSubject();

			Jws<Claims> claims = Jwts.parserBuilder()
					.setSigningKey(key)
					.build()
					.parseClaimsJws(token.replace(PREFIX, ""));

			Claims body = claims.getBody();


			String bodyJson = body.toString();
			System.out.println("JWT 본문: " + bodyJson);

//			System.out.println("유저" + user);


			if (body != null)
				return body;
		}
		return null;
	}
}
