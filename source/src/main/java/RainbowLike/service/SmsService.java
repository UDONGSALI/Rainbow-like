package RainbowLike.service;

import RainbowLike.dto.SmsHistDto;
import RainbowLike.dto.SmsRecepTelDto;
import RainbowLike.entity.SmsHist;
import RainbowLike.entity.SmsRecepTel;
import RainbowLike.repository.SmsHistRepository;
import RainbowLike.repository.SmsRecepTelRepository;
import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class SmsService {
    private  final String apiKey = "NCSB52VZNJWSSRPP";
    private  final String apiSecret = "KNLBRR4PSHSL7QERAHM2SD6WQMNK3VZ4";

    private  final DefaultMessageService messageService;
    @Autowired
    ModelMapper mapper;
    @Autowired
    SmsHistRepository smsHistRepository;
    @Autowired
    SmsRecepTelRepository smsRecepTelRepository;

    // 맵을 사용하여 전화번호와 인증번호를 저장
    private Map<String, String> phoneVerificationMap = new HashMap<>();

    public SmsService(){
        this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, "https://api.coolsms.co.kr");
    }

    public SingleMessageSentResponse ftcSms (String to, Long ftcNum) {
        Message message = new Message();
        message.setFrom("01075260231");
        message.setTo(to);
        message.setText("[세종여성플라자] 신청하신 여성인재풀DB가 매칭되었습니다.\n신청하신 글을 확인해주세요.(로그인 후 확인 가능) " + "http://localhost:3000/ftc/" + ftcNum);

        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        return response;
    }
    public SingleMessageSentResponse ftwSms (String to) {
        Message message = new Message();
        message.setFrom("01075260231");
        message.setTo(to);
        message.setText("[세종여성플라자] 회원님의 여성인재풀DB가 열람되었습니다.\n여성인재풀DB에 기재하신 연락처로 연락이 갈 수 있습니다.");

        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        return response;
    }

    public void createTestSms(ArrayList<SmsHistDto> smsList) {
        for (SmsHistDto smsHistDto : smsList) {
            mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
            SmsHist smsHist = mapper.map(smsHistDto, SmsHist.class);

            smsHistRepository.save(smsHist);
        }

    }
    public void createTestSmsRecep(ArrayList<SmsRecepTelDto> smsList) {
        for (SmsRecepTelDto smsRecepTelDto : smsList) {
            mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
            SmsRecepTel smsRecepTel = mapper.map(smsRecepTelDto, SmsRecepTel.class);

            smsRecepTelRepository.save(smsRecepTel);
        }

    }

    public SingleMessageSentResponse sendSMS(String from, String to, String txt) {
        Message message = new Message();
        message.setFrom(from);
        message.setTo(to);
        message.setText(txt);

        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        return response;
    }

    public void saveSmsRecepTels(List<String> telList, Long histNum) {
        // DB에 저장
        for (String t : telList) {
            SmsHist smsHist = new SmsHist();
            smsHist.setSmsHistNum(histNum);

            SmsRecepTel smsRecepTel = new SmsRecepTel();
            smsRecepTel.setSmsHist(smsHist);
            smsRecepTel.setRecepTel(t);

            smsRecepTelRepository.save(smsRecepTel);
        }
    }

//    public Optional<SmsRecepTel> findSmsRecepTelBySmsHistNum(Long histNum) {
//        return Optional.ofNullable(smsRecepTelRepository.findBySmsHistNum(histNum));
//    }
}
