package RainbowLike.service;

import RainbowLike.constant.Gender;
import RainbowLike.constant.Type;
import RainbowLike.dto.MemberFormDto;
import RainbowLike.entity.FtConsumer;
import RainbowLike.entity.Member;
import RainbowLike.entity.Post;
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
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService implements UserDetailsService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper mapper;
    private final FileRepository fileRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final ChatRepository chatRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final EduHistRepository eduHistRepository;
    private final RentHistRepository rentHistRepository;
    private final FtWorkerRepository ftWorkerRepository;
    private final FtConsumerRepository ftConsumerRepository;
    private final LogRepository logRepository;

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


    public boolean checkIdDuplicate(String memId) {
        Member findMember = memberRepository.findByMemId(memId);
        if (findMember != null)
            return true;
        return false;
    }

    //회원탈퇴에 따른 멤버삭제

    public void deleteMember(String memId) {
        Member member = memberRepository.findByMemId(memId);

        if (member != null) {

            // 파일 레포지토리
            if (fileRepository.existsByMember_MemId(memId)) {
                fileRepository.deleteByMember_MemId(memId);
            }
            // 게시물 레포지토리
            if (postRepository.existsByMember_MemId(memId)) {
                postRepository.deleteByMember_MemId(memId);
            }
            // 채팅 레포지토리
            if (chatRepository.existsByMember_MemId(memId)) {
                chatRepository.deleteByMember_MemId(memId);
            }
            // 채팅방 레포지토리
            if (chatRoomRepository.existsByMember_MemId(memId)) {
                chatRoomRepository.deleteByMember_MemId(memId);
            }
            // 교육 이력 레포지토리
            if (eduHistRepository.existsByMember_MemId(memId)) {
                eduHistRepository.deleteByMember_MemId(memId);
            }
            // 대여 이력 레포지토리
            if (rentHistRepository.existsByMember_MemId(memId)) {
                rentHistRepository.deleteByMember_MemId(memId);
            }
            // 전문가(Worker) 레포지토리
            if (ftWorkerRepository.existsByMember_MemId(memId)) {
                ftWorkerRepository.deleteByMember_MemId(memId);
            }
            // 소비자(Consumer) 레포지토리
            if (ftConsumerRepository.existsByMember_MemId(memId)) {
                ftConsumerRepository.deleteByMember_MemId(memId);
            }
            // 로그 레포지토리
            if (logRepository.existsByMember_MemId(memId)) {
                logRepository.deleteByMember_MemId(memId);
            }

            // 멤버 삭제
            memberRepository.deleteByMember_MemId(memId);

        }
    }

}
