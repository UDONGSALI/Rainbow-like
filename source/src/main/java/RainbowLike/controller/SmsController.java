package RainbowLike.controller;


import RainbowLike.service.FTalentService;
import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/sms")
@RequiredArgsConstructor
public class SmsController {

    private  final String apiKey = "NCSB52VZNJWSSRPP";
    private  final String apiSecret = "KNLBRR4PSHSL7QERAHM2SD6WQMNK3VZ4";

    private  final DefaultMessageService messageService;

    @Autowired
    FTalentService ftService;

    // 맵을 사용하여 전화번호와 인증번호를 저장
    private Map<String, String> phoneVerificationMap = new HashMap<>();

    public SmsController() {
        // 반드시 계정 내 등록된 유효한 API 키, API Secret Key를 입력해주셔야 합니다!
        this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, "https://api.coolsms.co.kr");
    }

    @PostMapping("/send-one")
    public SingleMessageSentResponse sendOne() {
        Message message = new Message();
        // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
        message.setFrom("01075260231");
        message.setTo("01039393808");
        message.setText("안녕하세용");

        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        System.out.println(response);
        return response;
    }
    @PostMapping("/tel-check/{to}")
    public SingleMessageSentResponse telCheck(@PathVariable String to) {

        Message message = new Message();
        // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
        message.setFrom("01075260231");
        message.setTo(to);

        // 여기서 랜덤한 6자리 번호를 생성함
        Random random = new Random();
        int randomNumber = random.nextInt(900000) + 100000;
        String randomString = String.valueOf(randomNumber);
        System.out.println(randomString);

        message.setText("세종여성 플라자 인증번호 " + randomString);

        // 생성된 인증번호를 맵에 저장
        phoneVerificationMap.put(to, randomString);

        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        return response;
    }

    @PostMapping("/verify/{to}/{code}")
    public ResponseEntity<String> verify(@PathVariable String to, @PathVariable String code) {

        // 맵에서 전화번호에 해당하는 인증번호를 가져옴
        String storedCode = phoneVerificationMap.getOrDefault(to, "");

        if(storedCode.equals(code)) {
            return ResponseEntity.ok("Verification successful.");
        } else {
            return ResponseEntity.badRequest().body("Verification failed.");
        }
    }

    @PostMapping("/ftmsms/{ftcNum}")
    public void ftmSms (@PathVariable Long ftcNum){
        List<String> wTelList = ftService.findWTelByConsumerNum(ftcNum);
        List<String> cTelList = ftService.findCTelByConsumerNum(ftcNum);
        String cTel = cTelList.get(0);

        ftService.ftcSms(cTel, ftcNum);
        for (String s : wTelList) {
            ftService.ftwSms(s);
        }

//        ftcSms(cTel, ftcNum);
//        for (String s : wTelList) {
//            ftwSms(s);
//        }

    }

    public SingleMessageSentResponse ftcSms (String to, Long ftcNum) {
        Message message = new Message();
        message.setFrom("01075260231");
        message.setTo(to);
        message.setText("[세종여성플라자] 신청하신 여성인재풀DB이 매칭되었습니다.\n신청하신 글을 확인해주세요.(로그인 후 확인 가능) " + "http://localhost:3000/ftc/" + ftcNum);

        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        System.out.println(response);
        return response;
    }
    public SingleMessageSentResponse ftwSms (String to) {
        Message message = new Message();
        message.setFrom("01075260231");
        message.setTo(to);
        message.setText("[세종여성플라자] 회원님의 여성인재풀DB가 열람되었습니다.\n여성인재풀DB에 기재하신 연락처로 연락이 갈 수 있습니다.");

        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        System.out.println(response);
        return response;
    }

    @PostMapping("/free")
    public SingleMessageSentResponse freeSms(@PathVariable String to) {

        Message message = new Message();
        // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
        message.setFrom("01075260231");
        message.setTo(to);

        // 여기서 랜덤한 6자리 번호를 생성함
        Random random = new Random();
        int randomNumber = random.nextInt(900000) + 100000;
        String randomString = String.valueOf(randomNumber);
        System.out.println(randomString);

        message.setText("세종여성 플라자 인증번호 " + randomString);

        // 생성된 인증번호를 맵에 저장
        phoneVerificationMap.put(to, randomString);

        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        return response;
    }



}
