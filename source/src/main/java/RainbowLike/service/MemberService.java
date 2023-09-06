package RainbowLike.service;

import RainbowLike.entity.Member;
import RainbowLike.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MemberService implements UserDetailsService {

	@Autowired
	private final MemberRepository memberRepository;

	public Member saveMember(Member member) {
//		validateDuplicateMember(member);

		return (Member) memberRepository.save(member);
	}

	public MemberService(MemberRepository memberRepository, MemberRepository memberRepository1){

		this.memberRepository = memberRepository1;
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
