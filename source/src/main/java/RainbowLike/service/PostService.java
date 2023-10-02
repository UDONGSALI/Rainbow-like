package RainbowLike.service;

import RainbowLike.dto.PostFormDto;
import RainbowLike.entity.Board;
import RainbowLike.entity.Post;
import RainbowLike.repository.BoardRepository;
import RainbowLike.repository.ClubRepository;
import RainbowLike.repository.MemberRepository;
import RainbowLike.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {
    private  final ClubRepository clubRepository;
    private  final PostRepository postRepository;
    private  final BoardRepository boardRepository;
    private  final MemberRepository memberRepository;
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