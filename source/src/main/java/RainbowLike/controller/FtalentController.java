package RainbowLike.controller;

import RainbowLike.dto.*;
import RainbowLike.entity.*;
import RainbowLike.repository.FemaleTalentMatchingRepository;
import RainbowLike.repository.FtConsumerRepository;
import RainbowLike.repository.FtWorkerRepository;
import RainbowLike.service.FTalentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class FtalentController {

    @Autowired
    FtWorkerRepository ftwRepository;
    @Autowired
    FtConsumerRepository ftcRepository;
    @Autowired
    FemaleTalentMatchingRepository ftmRepository;
    @Autowired
    FTalentService ftService;

    @RequestMapping("/ftw")
    public Iterable<FtWorker> getWorkers() {
        return ftwRepository.findAll();
    }

    @RequestMapping("/ftc")
    public Iterable<FtConsumer> getConsumers() {
        return ftcRepository.findAll();
    }

    @RequestMapping("/ftm")
    public Iterable<FemaleTalentMatching> getFTMs() {
        return ftmRepository.findAll();
    }

    @GetMapping("/ftw/{id}")
    public ResponseEntity<FTInfo> getFtwInfo(@PathVariable Long id) {

        FtWorker ftw = ftwRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id + "은 존재하지 않는 여성인재입니다."));

        Member member = ftw.getMember();

        FTInfo ftwInfo = new FTInfo(ftw, member);

        return ResponseEntity.ok(ftwInfo);
    }

    @GetMapping("/ftc/{id}")
    public ResponseEntity<FTInfo> getFtcInfo(@PathVariable Long id) {

        FtConsumer ftc = ftcRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id + "은 존재하지 않는 여성인재 신청입니다."));

        Member member = ftc.getMember();

        FTInfo ftcInfo = new FTInfo(ftc, member);

        return ResponseEntity.ok(ftcInfo);
    }

    @GetMapping("/ftm/{id}")
    public ResponseEntity<FTInfo> getFtmInfo(@PathVariable Long id) {

        FemaleTalentMatching ftm = ftmRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id + "은 존재하지 않는 매칭결과입니다."));

        FtWorker ftw = ftm.getFtWorker();
        FtConsumer ftc = ftm.getFtConsumer();

        FTInfo ftmInfo = new FTInfo(ftm, ftw, ftc);

        return ResponseEntity.ok(ftmInfo);
    }

    @PostMapping("/ftw/new")
    public ResponseEntity<FtWorker> createFtw(@RequestBody FtwDto ftwDto) {
        FtWorker newFtw = new FtWorker();

        Member member = new Member();
        member.setMemNum(ftwDto.getMemNum());
        newFtw.setMember(member);

        newFtw.setSpeField(ftwDto.getSpeField());
        newFtw.setLicenseYN(ftwDto.getLicenseYN());
        newFtw.setLicenseDtl(ftwDto.getLicenseDtl());
        newFtw.setFtDtl(ftwDto.getFtDtl());
        newFtw.setFtStatus(ftwDto.getFtStatus());
        newFtw.setDelYN(ftwDto.getDelYN());

        FtWorker savedFtw = ftwRepository.save(newFtw);

        // 저장한 게시글을 반환
        return ResponseEntity.ok(savedFtw);
    }

    @PostMapping("/ftc/new")
    public ResponseEntity<FtConsumer> createFtc(@RequestBody FtcDto ftcDto) {
        FtConsumer newFtc = new FtConsumer();

        Member member = new Member();
        member.setMemNum(ftcDto.getMemNum());
        newFtc.setMember(member);

        newFtc.setSpeField(ftcDto.getSpeField());
        newFtc.setApplyContent(ftcDto.getApplyContent());
        newFtc.setStatusDtl(ftcDto.getStatusDtl());
        newFtc.setFtmYN(ftcDto.getFtmYN());

        FtConsumer savedFtc = ftcRepository.save(newFtc);

        // 저장한 게시글을 반환
        return ResponseEntity.ok(savedFtc);
    }

    @PostMapping("/ftm/new")
    public ResponseEntity<FemaleTalentMatching> createFtm(@RequestBody FtmDto ftmDto) {
        FemaleTalentMatching newFtm = new FemaleTalentMatching();

        FtWorker ftw = new FtWorker();
        ftw.setFtWorkerNum(ftmDto.getFtWorkerNum());
        newFtm.setFtWorker(ftw);
        FtConsumer ftc = new FtConsumer();
        ftc.setFtConsumerNum(ftmDto.getFtConsumerNum());
        newFtm.setFtConsumer(ftc);

        FemaleTalentMatching savedFtm = ftmRepository.save(newFtm);

        // 저장한 게시글을 반환
        return ResponseEntity.ok(savedFtm);
    }

    @RequestMapping("/ftw/edit/{ftwId}")
    public ResponseEntity<FtWorker> editFtw(@PathVariable Long ftwId, @RequestBody FtwDto ftwDto) {
        FtWorker editFtw = new FtWorker();

        editFtw.setFtWorkerNum(ftwId);

        Member member = new Member();
        member.setMemNum(ftwDto.getMemNum());
        editFtw.setMember(member);

        editFtw.setSpeField(ftwDto.getSpeField());
        editFtw.setLicenseYN(ftwDto.getLicenseYN());
        editFtw.setLicenseDtl(ftwDto.getLicenseDtl());
        editFtw.setFtDtl(ftwDto.getFtDtl());
        editFtw.setFtStatus(ftwDto.getFtStatus());
        editFtw.setDelYN(ftwDto.getDelYN());

        FtWorker savedFtw = ftwRepository.save(editFtw);

        // 저장한 게시글을 반환
        return ResponseEntity.ok(savedFtw);
    }

    @RequestMapping("/ftc/edit/{ftcId}")
    public ResponseEntity<FtConsumer> editFtc(@PathVariable Long ftcId, @RequestBody FtcDto ftcDto) {
        FtConsumer editFtc = new FtConsumer();

        editFtc.setFtConsumerNum(ftcId);

        Member member = new Member();
        member.setMemNum(ftcDto.getMemNum());
        editFtc.setMember(member);

        editFtc.setSpeField(ftcDto.getSpeField());
        editFtc.setApplyContent(ftcDto.getApplyContent());
        editFtc.setStatusDtl(ftcDto.getStatusDtl());
        editFtc.setFtmYN(ftcDto.getFtmYN());

        FtConsumer savedFtc = ftcRepository.save(editFtc);

        // 저장한 게시글을 반환
        return ResponseEntity.ok(savedFtc);
    }

    @RequestMapping("/ftm/edit/{ftmId}")
    public ResponseEntity<FemaleTalentMatching> editFtc(@PathVariable Long ftmId, @RequestBody FtmDto ftmDto) {
        FemaleTalentMatching editFtm = new FemaleTalentMatching();

        editFtm.setFtmNum(ftmId);

        FtWorker ftw = new FtWorker();
        ftw.setFtWorkerNum(ftmDto.getFtWorkerNum());
        editFtm.setFtWorker(ftw);
        FtConsumer ftc = new FtConsumer();
        ftc.setFtConsumerNum(ftmDto.getFtConsumerNum());
        editFtm.setFtConsumer(ftc);

        FemaleTalentMatching savedFtm = ftmRepository.save(editFtm);

        // 저장한 게시글을 반환
        return ResponseEntity.ok(savedFtm);
    }

    public void createTestFtw(){
        ArrayList<FtwDto> ftwDtoList = FtwDto.createTestFtw();
        ftService.createFtw(ftwDtoList);
    }

    public void createTestFtc(){
        ArrayList<FtcDto> ftcDtoList = FtcDto.createTestFtc();
        ftService.createFtc(ftcDtoList);
    }

    public void createTestFtm(){
        ArrayList<FtmDto> ftmDtoList = FtmDto.createTestFtm();
        ftService.createFtm(ftmDtoList);
    }


}
