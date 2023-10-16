package RainbowLike.entity;

import RainbowLike.constant.AnswerYN;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Iterator;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long chatRoomId;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JsonManagedReference(value="member-chatRooms")
    @JoinColumn(name = "mem_num")
    private Member member;

    @Column(name = "answer_yn")
    private AnswerYN answerYN;

    @PreRemove
    public void leaveChatRoomBeforeMemberRemoval() {
        if (member != null) {
            Iterator<ChatRoom> iterator = member.getChatRooms().iterator();
            while (iterator.hasNext()) {
                ChatRoom chatRoom = iterator.next();
                if (chatRoom.equals(this)) {
                    iterator.remove();
                }
            }
        }
    }

}