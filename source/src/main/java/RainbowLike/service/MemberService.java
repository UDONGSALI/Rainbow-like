package RainbowLike.service;

import RainbowLike.dto.MemberFormDto;
import RainbowLike.entity.Member;
import RainbowLike.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService implements UserDetailsService {

    private final MemberRepository memberRepository;



    public void saveMember(Member member) {
//		validateDuplicateMember(member);

        memberRepository.save(member);
    }


    //	아이디로 회원을 찾아 유저빌더로 빌드
    @Override
    public UserDetails loadUserByUsername(String memId) throws UsernameNotFoundException {
        Member member = memberRepository.findByMemId(memId);
        if (member == null) {
            throw new UsernameNotFoundException(memId);
        }
        return User.builder()
                .username(member.getMemId())
                .password(member.getPwd())
                .roles(member.getType().toString())
                .build();
    }


    public boolean checkIdDuplicate(String memId) {
        Member findMember = memberRepository.findByMemId(memId);
        if (findMember != null)
            return true;
        return false;
    }

}
