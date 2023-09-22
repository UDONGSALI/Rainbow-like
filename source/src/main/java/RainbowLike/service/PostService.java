package RainbowLike.service;

import RainbowLike.dto.PostFormDto;
import RainbowLike.entity.Post;
import RainbowLike.repository.ClubRepository;
import RainbowLike.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {
    @Autowired
    ClubRepository clubRepository;
    @Autowired
    PostRepository postRepository;
    private final ModelMapper mapper;

public void savePost(Post post) {

        postRepository.save(post);
}

    public void createPosts(ArrayList<PostFormDto> postList){
        for(PostFormDto postFormDto : postList){
            mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
            Post post = mapper.map(postFormDto, Post.class);

            postRepository.save(post);
        }
    }

}
