package RainbowLike.service;

import RainbowLike.entity.Member;
import RainbowLike.repository.ClubRepository;
import RainbowLike.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostByMemberService {
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private ClubRepository clubRepository;

    public Member getMemberByMemNum(Long memNum) {
        return memberRepository.findByMemNum(memNum);
    }

}
