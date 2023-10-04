package RainbowLike.controller;


import RainbowLike.dto.SmsHistDto;
import RainbowLike.dto.SmsRecepTelDto;
import RainbowLike.entity.SmsHist;
import RainbowLike.entity.SmsRecepTel;
import RainbowLike.repository.SmsHistRepository;
import RainbowLike.repository.SmsRecepTelRepository;
import RainbowLike.service.FTalentService;
import RainbowLike.service.SmsService;
import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/sms")
@RequiredArgsConstructor
public class SmsController {

    private final String apiKey = "NCSB52VZNJWSSRPP";
    private final String apiSecret = "KNLBRR4PSHSL7QERAHM2SD6WQMNK3VZ4";

    private final DefaultMessageService messageService;

    @Autowired
    SmsHistRepository smsHistRepository;

    @Autowired
    SmsRecepTelRepository smsRecepTelRepository;

    @Autowired
    FTalentService ftService;

    @Autowired
    SmsService smsService;

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

        if (storedCode.equals(code)) {
            return ResponseEntity.ok("Verification successful.");
        } else {
            return ResponseEntity.badRequest().body("Verification failed.");
        }
    }

    @RequestMapping("/hist")
    public Iterable<SmsHist> getSmsHist() {
        return smsHistRepository.findAll();
    }

    @RequestMapping("/hist/{id}")
    public ResponseEntity<SmsHist> getSmsHist(@PathVariable Long id) {
        return smsHistRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @RequestMapping("/recep")
    public Iterable<SmsRecepTel> getSmsRecepTel() {
        return smsRecepTelRepository.findAll();
    }

    @RequestMapping("/recep/{id}")
    public ResponseEntity<SmsRecepTel> getSmsRecepTel(@PathVariable Long id) {
        return smsRecepTelRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @RequestMapping("/recepby/{id}")
    public Iterable<SmsRecepTel> getSmsRecepTelByHistNum(@PathVariable Long id) {
        SmsHist smsHist = new SmsHist();
        smsHist.setSmsHistNum(id);
        return smsRecepTelRepository.findBySmsHist(smsHist);

    }

    @RequestMapping("/receptel/{id}")
    public List<String> getRecepTel(@PathVariable Long id) {
        List recepTelList = smsRecepTelRepository.findRecepTelBySmsHistNum(id);
        return recepTelList;
    }

    @PostMapping("/sendsms/{histNum}")
    public void freeSend(@PathVariable Long histNum) {
        Optional<SmsHist> histList = smsHistRepository.findById(histNum);
        String sendTel = histList.get().getSendTel();
        String txt = histList.get().getContent();
        List<String> recepTelList = smsRecepTelRepository.findRecepTelBySmsHistNum(histNum);
        for (String r : recepTelList) {
//            smsService.sendSMS(r, sendTel, txt);
            System.out.println("보내는 사람 : " + sendTel);
            System.out.println("받는 사람 : " + r);
            System.out.println("전달 내용 : " + txt);
        }
    }


        @PostMapping("/ftmsms/{ftcNum}")
        public void ftmSms (@PathVariable Long ftcNum){
            List<String> wTelList = ftService.findWTelByConsumerNum(ftcNum);
            List<String> cTelList = ftService.findCTelByConsumerNum(ftcNum);
            String cTel = cTelList.get(0);

            // 테스트 중 실제 문자메시지 전송되지 않고 콘솔 출력하게 함
            ftService.ftcSms(cTel, ftcNum);
            for (String s : wTelList) {
                ftService.ftwSms(s);
            }

            //실제 메시지 전송 메서드 호출
//        smsService.ftcSms(cTel, ftcNum);
//        for (String s : wTelList) {
//            smsService.ftwSms(s);
//        }

        }

        @PostMapping("/newhist")
        public ResponseEntity<SmsHist> createSms (@RequestBody SmsHistDto smsHistDto){
            SmsHist newSms = new SmsHist();
            newSms.setSmsType(smsHistDto.getSmsType());
            newSms.setSendTel(smsHistDto.getSendTel());
            newSms.setContent(smsHistDto.getContent());
            newSms.setSendDate(LocalDateTime.now());

            SmsHist savedSms = smsHistRepository.save(newSms);

            return ResponseEntity.ok(savedSms);
        }
        @PostMapping("/newRecepTel")
        public ResponseEntity<SmsRecepTel> createSmsRecep (@RequestBody SmsRecepTelDto smsRecepTelDto){
            SmsRecepTel newSms = new SmsRecepTel();
            SmsHist hist = new SmsHist();
            hist.setSmsHistNum(smsRecepTelDto.getSmsHistNum());
            newSms.setSmsHist(hist);
            newSms.setSmsRecepTelNum(smsRecepTelDto.getSmsHistNum());
            newSms.setRecepTel(smsRecepTelDto.getRecepTel());

            SmsRecepTel savedSms = smsRecepTelRepository.save(newSms);

            return ResponseEntity.ok(savedSms);
        }


        public void createTestSms () {
            ArrayList<SmsHistDto> smsDtoList = SmsHistDto.createTestSms();
            smsService.createTestSms(smsDtoList);
            ArrayList<SmsRecepTelDto> smsRecepTelList = SmsRecepTelDto.createTestSmsRecepTel();
            smsService.createTestSmsRecep(smsRecepTelList);
        }

    }

