package RainbowLike.dto;

import RainbowLike.constant.AnswerYN;
import RainbowLike.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;


@Getter
@Setter
public class ChatRoomDto {

    @JsonIgnore
    private Member member;
    private AnswerYN answerYN;

    public ChatRoomDto(){

    }
    public ChatRoomDto(Member member, AnswerYN answerYN){
        this.member = member;
        this.answerYN = answerYN;
    }

    static public ArrayList<ChatRoomDto> createTestChatRoom(){
        ArrayList<ChatRoomDto> chatRoomList = new ArrayList<>();
        Member member1 = new Member();
        Member member2 = new Member();
        Member member3 = new Member();
        member1.setMemNum(2L);
        member2.setMemNum(3L);
        member3.setMemNum(4L);

        ChatRoomDto chatRoom1 = new ChatRoomDto();
        chatRoom1.setMember(member1);
        chatRoom1.setAnswerYN(AnswerYN.N);
        chatRoomList.add(chatRoom1);


        ChatRoomDto chatRoom2 = new ChatRoomDto();
        chatRoom2.setMember(member2);
        chatRoom2.setAnswerYN(AnswerYN.Y);
        chatRoomList.add(chatRoom2);


        ChatRoomDto chatRoom3 = new ChatRoomDto();
        chatRoom3.setMember(member3);
        chatRoom3.setAnswerYN(AnswerYN.N);
        chatRoomList.add(chatRoom3);

        return chatRoomList;
    }

}
