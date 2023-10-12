package RainbowLike.controller;

import RainbowLike.dto.ChatDto;
import RainbowLike.dto.ChatRoomDto;
import RainbowLike.entity.Chat;
import RainbowLike.entity.ChatRoom;
import RainbowLike.entity.Member;
import RainbowLike.repository.ChatRepository;
import RainbowLike.repository.ChatRoomRepository;
import RainbowLike.repository.MemberRepository;
import RainbowLike.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequiredArgsConstructor

public class ChatController {

    @Autowired
    ChatRoomRepository chatRoomRepository;
    @Autowired
    ChatRepository chatRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    ChatService chatService;

    @GetMapping("/chatroom")
    public Iterable<ChatRoom> getChatRooms(){
       return chatRoomRepository.findAll();
    }

    @GetMapping("/chat")
    public Iterable<Chat> getChats(){return chatRepository.findAll();}

    @GetMapping("chatroom/{id}")
    public Iterable<ChatRoom> getChatRoom(@PathVariable Long id){
        Member member = memberRepository.findByMemNum(id);
        return chatRoomRepository.findByMember(member);
    }
    @GetMapping("chat/{id}")
    public Optional<Chat> getChat(@PathVariable Long id){
        return chatRepository.findById(id);
    }

    @GetMapping("findchatbyroom/{memNum}")
    public Iterable<Chat> getChatByRoomNum(@PathVariable Long memNum){
        Member member = memberRepository.findByMemNum(memNum);
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setMember(member);
        return chatRepository.findByChatRoom(chatRoom);
    }

    public void createTestChat () {
        ArrayList<ChatRoomDto> chatRoomList = ChatRoomDto.createTestChatRoom();
        chatService.createTestChatRoom(chatRoomList);
        ArrayList<ChatDto> chatList = ChatDto.createTestChat();
        chatService.createTestChat(chatList);
    }
}
