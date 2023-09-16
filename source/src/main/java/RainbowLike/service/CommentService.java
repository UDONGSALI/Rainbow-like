package RainbowLike.service;

import RainbowLike.dto.CommentFormDto;
import RainbowLike.entity.Comment;
import RainbowLike.repository.CommentRepository;
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

public class CommentService {
    @Autowired
    CommentRepository commentRepository;
    private final ModelMapper mapper;

public void saveComment(Comment comment) {

        commentRepository.save(comment);
}

    public void createcomments(ArrayList<CommentFormDto> commentList){
        for(CommentFormDto commentFormDto : commentList){
            mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
            Comment comment = mapper.map(commentFormDto, Comment.class);

            commentRepository.save(comment);
        }
    }

}