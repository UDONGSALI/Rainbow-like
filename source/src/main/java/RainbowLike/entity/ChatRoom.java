package RainbowLike.entity;

import RainbowLike.constant.AnswerYN;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long chatRoomId;

    @ManyToOne
    @JoinColumn(name = "mem_num")
    private Member member;

    @Column(name = "answer_yn")
    private AnswerYN answerYN;
}