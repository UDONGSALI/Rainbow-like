package RainbowLike.dto;

import RainbowLike.entity.Board;
import RainbowLike.entity.Member;
import RainbowLike.entity.Post;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class PostInfo {
    private Post post;
    private Board board;
    private Member member;
    public PostInfo(Post post, Board board,Member member) {
        this.post = post;
        this.board = board;
        this.member = member;
    }
}
