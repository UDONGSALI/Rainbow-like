package RainbowLike.controller;


import RainbowLike.dto.EduHistDto;
import RainbowLike.entity.Board;
import RainbowLike.entity.EduHist;
import RainbowLike.entity.Member;
import RainbowLike.repository.EduHistRepository;
import RainbowLike.repository.EduRepository;
import RainbowLike.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/eduHist")
public class EduHistController {

    private final ModelMapper mapper;
    private final EduHistRepository eduHistRepository;
    private final MemberRepository memberRepository;
    private final EduRepository eduRepository;


    @GetMapping
    private Iterable<EduHist> getEduHists() {
        return eduHistRepository.findAll();
    }

    @PostMapping
    private ResponseEntity<EduHist> saveEduHist(@RequestBody EduHistDto eduHistDto) {

        System.out.println("확인" + eduHistDto.toString());
        eduHistDto.setMember(memberRepository.findByMemNum(eduHistDto.getMemNum()));
        eduHistDto.setEdu(eduRepository.findByEduNum(eduHistDto.getEduNum()));
        System.out.println(eduHistDto.getStatus());
        System.out.println(eduHistDto.getApplyDate());
        System.out.println(eduHistDto.getMemNum());
        System.out.println(eduHistDto.getEduNum());

        EduHist eduHist = mapper.map(eduHistDto,EduHist.class);


        return ResponseEntity.ok(eduHistRepository.save(eduHist));
    }
}
