package RainbowLike.service;

import RainbowLike.entity.Post;
import RainbowLike.repository.ClubRepository;
import RainbowLike.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class ClubService {
    @Autowired
    ClubRepository clubRepository;
    @Autowired
    PostRepository postRepository;

//    public void saveClub(ClubFormDto clubFormDto) {
//        Post club = Post.createClub(ClubFormDto);
//        clubRepository.save(club);
//    }
//}
public void savePost(Post post) {

        postRepository.save(post);
        }
        }