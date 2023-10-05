package RainbowLike.controller;

import RainbowLike.dto.PayHistDto;
import RainbowLike.dto.PaymentAndStatusChangeResult;
import RainbowLike.entity.PayHist;
import RainbowLike.service.PayHistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/pay")
public class PayHistController {

    private final PayHistService payHistService;

    @GetMapping
    private Iterable<PayHist> getPayHists() {
        return payHistService.findAll();
    }

    @PostMapping
    public ResponseEntity<PaymentAndStatusChangeResult> processPaymentAndStatusChange(@RequestBody PayHistDto payHistDto) {
        PaymentAndStatusChangeResult result = payHistService.processPaymentAndStatusChange(payHistDto);
        return ResponseEntity.ok(result);
    }
}
