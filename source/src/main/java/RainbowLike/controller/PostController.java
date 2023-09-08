package RainbowLike.controller;

import RainbowLike.entity.Post;
import RainbowLike.projection.PostProjection;
import RainbowLike.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PostController {
    @Autowired
    private PostRepository postRepository;

    @RequestMapping("/posts")
    public Iterable<Post> getPosts() {
        return postRepository.findAll();
    }

//    @RequestMapping("/postlist")
//    public ResponseEntity<PostProjection> getPostlist() {
//        PostProjection postProjection = postRepository.findPostProjectionByAll();
//
//        if (postProjection == null) {
//            throw new ResourceNotFoundException("erororororor");
//        }
//
//        return ResponseEntity.ok(postProjection);
//    }

    @GetMapping("/postlist/{id}")
    public ResponseEntity<PostProjection> getBoardNum(@PathVariable Long id) {
        PostProjection postProjection = postRepository.findPostProjectionByBoardNum(id);

        if (postProjection == null) {
            throw new ResourceNotFoundException("Post not found with id: " + id);
        }

        return ResponseEntity.ok(postProjection);
    }
}
