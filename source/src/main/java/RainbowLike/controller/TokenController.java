package RainbowLike.controller;

import RainbowLike.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/token")
@RequiredArgsConstructor
public class TokenController {

    private final JwtService jwtService;

    @DeleteMapping
    public void deleteToken(@RequestParam String jti) {
        jwtService.deleteTokenByJti(jti);
    }

}
