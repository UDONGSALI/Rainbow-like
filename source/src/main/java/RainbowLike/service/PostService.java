package RainbowLike.service;

import RainbowLike.entity.Post;
import RainbowLike.repository.ClubRepository;
import RainbowLike.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor

public class PostService {
    @Autowired
    ClubRepository clubRepository;
    @Autowired
    PostRepository postRepository;

public void savePost(Post post) {

        postRepository.save(post);
}

    @Transactional
    public int updatePageView(Long id) {
    return postRepository.updateView(id);
}
}