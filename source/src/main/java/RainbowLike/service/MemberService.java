package RainbowLike.service;

import RainbowLike.constant.DelYN;
import RainbowLike.constant.Gender;
import RainbowLike.constant.Type;
import RainbowLike.dto.MemberFormDto;
import RainbowLike.entity.*;
import RainbowLike.repository.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService implements UserDetailsService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper mapper;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final RentHistRepository rentHistRepository;
    private final FtWorkerRepository ftWorkerRepository;
    private final FtConsumerRepository ftConsumerRepository;

    @PostConstruct
    private void createDefaultMembers() {
        List<MemberFormDto> memberFormDtoList = MemberFormDto.createtestMember();
        for (MemberFormDto memberFormDto : memberFormDtoList) {
            saveMember(memberFormDto);
        }
    }

    public Member saveMember(MemberFormDto memberDto) {
        Member member = mapper.map(memberDto, Member.class);
        String encodedPassword = passwordEncoder.encode(member.getPwd());
        member.setPwd(encodedPassword);
        return memberRepository.save(member);
    }

    public Iterable<Member> findAllMembers() {
        return memberRepository.findAll();
    }

    public Optional<Member> findMemberByMemId(String memId) {
        return Optional.ofNullable(memberRepository.findByMemId(memId));
    }

    public Optional<String> findMemIdByTel(String tel) {
        Member member = memberRepository.findByTel(tel);
        return Optional.ofNullable(member.getMemId());
    }

    public Optional<String> findTelByMemId(String memId) {
        Member member = memberRepository.findByMemId(memId);
        return Optional.ofNullable(member.getTel());
    }

    public Iterable<Member> searchMember(String option, String value) {
        switch (option) {
            case "memId":
                return memberRepository.findByMemIdContaining(value);
            case "type":
                Type type = Type.valueOf(value);
                return memberRepository.findByType(type);
            case "name":
                return memberRepository.findByNameContaining(value);
            case "addr":
                return memberRepository.findByAddrContaining(value);
            case "gender":
                Gender gender = Gender.valueOf(value);
                return memberRepository.findByGender(gender);
            default:
                return new ArrayList<>();
        }
    }

    public boolean checkDuplicate(String type, String value) {
        switch (type) {
            case "memId":
                return memberRepository.findByMemId(value) != null;
            case "email":
                return memberRepository.findByEmail(value) != null;
            case "tel":
                return memberRepository.findByTel(value) != null;
            default:
                throw new IllegalArgumentException("Invalid type provided");
        }
    }


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

    public Member changePassword(String id, String pwd) {
        Member member = memberRepository.findByMemId(id);
        if (member != null) {
            String encodedPassword = passwordEncoder.encode(pwd);
            member.setPwd(encodedPassword);
            return memberRepository.save(member);
        }
        return null;
    }

    //회원탈퇴
    public void withdrawal(String memId) {
        Member member = memberRepository.findByMemId(memId);
        member.setDelYN(DelYN.Y);
        memberRepository.save(member);
    }

    //멤버삭제
    public void deleteMember(String memId) {
        Member member = memberRepository.findByMemId(memId);
        chatRoomRepository.deleteByMember(member);
        postRepository.deleteByMember(member);
        postRepository.deleteByLabor(member);
        commentRepository.deleteByMember(member);
        rentHistRepository.deleteByMember(member);
        ftWorkerRepository.deleteByMember(member);
        ftConsumerRepository.deleteByMember(member);
        memberRepository.delete(member);
    }
}
