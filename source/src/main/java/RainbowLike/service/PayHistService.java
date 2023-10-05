package RainbowLike.service;

import RainbowLike.constant.Status;
import RainbowLike.dto.EduHistDto;
import RainbowLike.dto.PayHistDto;
import RainbowLike.dto.PaymentAndStatusChangeResult;
import RainbowLike.entity.EduHist;
import RainbowLike.entity.PayHist;
import RainbowLike.entity.RentHist;
import RainbowLike.repository.PayHistRepository;
import RainbowLike.repository.RentHistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PayHistService {

    private final PayHistRepository payHistRepository;
    private final RentHistRepository rentHistRepository;
    private final RentHistService rentHistService;

    public Iterable<PayHist> findAll() {
        return payHistRepository.findAll();
    }

    @Transactional
    public PaymentAndStatusChangeResult processPaymentAndStatusChange(PayHistDto payHistDto) {

        PayHist payHist = new PayHist();
        RentHist rentHist = rentHistRepository.findByRentHistNum(payHistDto.getRentHistNum());
        payHist.setRentHist(rentHist);
        payHist.setFee(payHistDto.getFee());

        payHistRepository.save(payHist);

        RentHist updatedRentHist = rentHistService.updateRentHistPayStatus(rentHist);

        return new PaymentAndStatusChangeResult(payHist, updatedRentHist);
    }
}
