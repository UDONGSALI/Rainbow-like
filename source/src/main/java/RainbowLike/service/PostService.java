package RainbowLike.service;

import RainbowLike.constant.Status;
import RainbowLike.dto.PostFormDto;
import RainbowLike.entity.Board;
import RainbowLike.entity.Post;
import RainbowLike.entity.RentHist;
import RainbowLike.repository.BoardRepository;
import RainbowLike.repository.ClubRepository;
import RainbowLike.repository.MemberRepository;
import RainbowLike.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {
    private  final MemberRepository memberRepository;
    private  final BoardRepository boardRepository;
    private  final PostRepository postRepository;
    private final SmsService smsService;
    private final ModelMapper mapper;

    public void savePost(Post post) {

        postRepository.save(post);
    }

    public Iterable<Post> searchPostsByBoardNumAndOptionAndValue(Long boardNum, String option, String value) {

        Board board = boardRepository.findByBoardNum(boardNum);

        switch (option.toLowerCase()) {
            case "title":
                return postRepository.findByBoardAndTitleContaining(board, value);
            case "content":
                return postRepository.findByBoardAndContentContaining(board, value);
            case "member":
                return postRepository.findByBoardAndMemberIn(board, memberRepository.findByMemIdContaining(value));
            default:
                return Collections.emptyList();
        }
    }

    public Optional<Post> updateRentClubAllowStatus(Long postNum, Status status) {
        Optional<Post> optionalRentHist = postRepository.findById(postNum);
        if (optionalRentHist.isPresent()) {
            Post post = optionalRentHist.get();
            post.setClubAllowStatus(status);
            return Optional.of(postRepository.save(post));
        }
        return Optional.empty();
    }

    @Transactional
    public Optional<Post> updateLabor(Long postNum, String memId) {
        Optional<Post> optionalPost = postRepository.findById(postNum);
        smsService.updateLaborSms(postNum, true);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            post.setLabor(memberRepository.findByMemId(memId));
            post.setConselStatus(Status.APPROVE);
            return Optional.of(postRepository.save(post));
        }
        return Optional.empty();
    }

    @Transactional
    public Post cancelLabor(Long postNum) {
        Optional<Post> optionalPost = postRepository.findById(postNum);
        smsService.updateLaborSms(postNum, false);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            post.setLabor(null);
            post.setConselStatus(Status.WAIT);
            return postRepository.save(post);
        }
        return null;
    }


    public void deletePost(Long postNum) {
        if (postRepository.existsById(postNum)) {
            postRepository.deleteById(postNum);
        } else {
            throw new RuntimeException("Post not found with postNum: " + postNum);
        }
    }

    public void createPosts(ArrayList<PostFormDto> postList) {
        for (PostFormDto postFormDto : postList) {
            mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
            Post post = mapper.map(postFormDto, Post.class);

            postRepository.save(post);
        }
    }

}