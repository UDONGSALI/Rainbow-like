package RainbowLike.controller;

import RainbowLike.entity.FtConsumer;
import RainbowLike.entity.FtWorker;
import RainbowLike.entity.Member;
import RainbowLike.repository.MemberRepository;
import RainbowLike.service.FTByMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/member-info")
public class FtInfoByMemberController {

    @Autowired
    private FTByMemberService ftByMemberService;

    @Autowired
    private MemberRepository memberRepository;

    @GetMapping("/ft-worker/{memId}")
    public List<FtWorker> getFtWorkerInfo(@RequestParam(name = "memId") Long memId) {
        Member member = memberRepository.findById(memId).orElse(null);
        return ftByMemberService.getFtWorkerInfoByMember(member);
    }

    @GetMapping("/ft-consumer/{memId}")
    public List<FtConsumer> getFtConsumerInfo(@RequestParam(name = "memId") Long memId) {
        Member member = memberRepository.findById(memId).orElse(null);
        return ftByMemberService.getFtConsumerInfoByMember(member);

    }
}