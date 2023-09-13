package RainbowLike;

import RainbowLike.constant.Gender;
import RainbowLike.constant.Type;
import RainbowLike.entity.Board;
import RainbowLike.entity.Member;
import RainbowLike.entity.Post;
import RainbowLike.repository.BoardRepository;
import RainbowLike.repository.MemberRepository;
import RainbowLike.repository.PostRepository;
import RainbowLike.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;

@SpringBootApplication
@RequiredArgsConstructor
public class RainbowLikeApplication implements CommandLineRunner {

    private final MemberService memberService;

    private final PasswordEncoder passwordEncoder;
    @Autowired
	private BoardRepository boardRepository;
    	@Autowired
	private MemberRepository memberRepository;
        @Autowired
        private PostRepository postRepository;
    public static void main(String[] args) {
        SpringApplication.run(RainbowLikeApplication.class, args);

    }

    	@Override
	public void run(String... args) throws Exception {

        Board board1 = new Board("Club", true, true, true);
		Board board2 = new Board("Test", true, false, false);
		boardRepository.saveAll(Arrays.asList(board1, board2));

        Member member1 = new Member("test1", "$2a$10$HX32zW6s/T1EvnnSDlKcde1uMtvkF/mq8qSf8XLv5PdBN26tT6YUG", Type.USER, "김유저", Gender.FEMALE, LocalDate.of(2023,01,01), "010-1111-1111", "test1@test.com", "대전 서구", "둔산서로 17", LocalDate.now());
        Member member2 = new Member("test2", "$2a$10$avDcExXAMm7U.tezpQsF9uaAKYsh4fb.kAAvdVdxgqeNbfiwro1Uq", Type.USER, "박유저", Gender.MALE ,LocalDate.of(2023,01,01), "010-2222-2222", "test2@test.com", "대전 서구", "양호빌딩", LocalDate.now());
		memberRepository.saveAll(Arrays.asList(member1, member2));


		Post club1 = new Post(member1, board1, "게시글테스트1", "테스트게시글1.", LocalDateTime.now(), 0, "허가", "모집중");
        Post club2 = new Post(member1, board1, "게시글테스트2", "테스트게시글2", LocalDateTime.now(), 0, "허가", "진행중");
        Post test1 = new Post(member2, board2, "게시글테스트3", "테스트게시글3", LocalDateTime.now(), 0, "거부", "거부");
		postRepository.saveAll(Arrays.asList(club1, club2, test1));






    }
}


