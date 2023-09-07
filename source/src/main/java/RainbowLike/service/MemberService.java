package RainbowLike.service;

import RainbowLike.dto.MemberFormDto;
import RainbowLike.entity.Member;
import RainbowLike.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
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

	private final ModelMapper mapper;

	private final PasswordEncoder passwordEncoder;


	public void saveMember(MemberFormDto memberFormDto) {
//		validateDuplicateMember(member);

		Member member = Member.createMember(memberFormDto, passwordEncoder);
		memberRepository.save(member);
	}


	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return null;
	}


	public boolean checkIdDuplicate(String memId) {
		Member findMember = memberRepository.findByMemId(memId);
		if(findMember != null) // 이미 admin계정이 있을경우
			return true;
		return false;
	}

}
