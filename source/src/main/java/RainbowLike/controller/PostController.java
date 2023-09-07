package RainbowLike.controller;

import RainbowLike.entity.Post;
import RainbowLike.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;


public class PostController {
    @Autowired
    private PostRepository postRepository;

    @RequestMapping("/posts")
    public Iterable<Post> getPosts() {
        return postRepository.findAll();
    }
}
