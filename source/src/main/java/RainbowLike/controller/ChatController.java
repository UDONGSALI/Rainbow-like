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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
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

    @Autowired
    private ChatRoomDto chatRoomDto;


    @GetMapping("/chatroom")
    public Iterable<ChatRoom> getChatRooms(){
       return chatRoomRepository.findAll();
    }

    @GetMapping("/chat")
    public Iterable<Chat> getChats(){return chatRepository.findAll();}

    @GetMapping("chatroom/{memNum}")
    public Iterable<ChatRoom> findRoomByMemNum(@PathVariable Long memNum){
        Member member = memberRepository.findByMemNum(memNum);
        return chatRoomRepository.findByMember(member);
    }
    @GetMapping("chat/{id}")
    public Optional<Chat> getChat(@PathVariable Long id){
        return chatRepository.findById(id);
    }

    @GetMapping("findchatbyroom/{roomNum}")
    public Iterable<Chat> getChatByRoomNum(@PathVariable Long roomNum){
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setChatRoomId(roomNum);
        return chatRepository.findByChatRoom(chatRoom);
    }
    @GetMapping("findchatbyMem/{memNum}")
    public Iterable<Chat> getChatBymemNum(@PathVariable Long memNum){
        return chatRepository.findByMemNum(memNum);
    }

    @RequestMapping("chatroom/new")
    public ResponseEntity<ChatRoom> createChatRoom(@RequestBody ChatRoomDto roomDto) {
        ChatRoom room = new ChatRoom();

        Member member = new Member();
        member.setMemNum(roomDto.getMemNum());
        room.setMember(member);
        room.setAnswerYN(roomDto.getAnswerYN());

        ChatRoom savedRoom = chatRoomRepository.save(room);

        return ResponseEntity.ok(savedRoom);
    }

    @RequestMapping("chat/new")
    public ResponseEntity<Chat> createChatRoom(@RequestBody ChatDto chatDto) {
        Chat newChat = new Chat();
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setChatRoomId(chatDto.getChatRoomId());
        newChat.setChatRoom(chatRoom);
        Member member = new Member();
        member.setMemNum(chatDto.getMemNum());
        newChat.setMember(member);
        newChat.setContent(chatDto.getContent());
        newChat.setWriteDate(LocalDateTime.now());

        Chat savedChat = chatRepository.save(newChat);

        return ResponseEntity.ok(savedChat);
    }

    public void createTestChat () {
        ArrayList<ChatRoomDto> chatRoomList = chatRoomDto.createTestChatRoom();
        chatService.createTestChatRoom(chatRoomList);
        ArrayList<ChatDto> chatList = ChatDto.createTestChat();
        chatService.createTestChat(chatList);


    }
}
