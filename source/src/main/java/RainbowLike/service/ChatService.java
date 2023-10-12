package RainbowLike.service;

import RainbowLike.dto.ChatDto;
import RainbowLike.dto.ChatRoomDto;
import RainbowLike.entity.Chat;
import RainbowLike.entity.ChatRoom;
import RainbowLike.repository.ChatRepository;
import RainbowLike.repository.ChatRoomRepository;
import RainbowLike.repository.MemberRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Service

public class ChatService {
    @Autowired
    ModelMapper mapper;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    ChatRoomRepository chatRoomRepository;
    @Autowired
    ChatRepository chatRepository;


    public void createTestChatRoom(ArrayList<ChatRoomDto> chatRoomList) {
        for (ChatRoomDto chatRoomDto : chatRoomList) {
            mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
            ChatRoom chatRoom = mapper.map(chatRoomDto, ChatRoom.class);

            chatRoomRepository.save(chatRoom);
        }

    }

    public void createTestChat(ArrayList<ChatDto> chatList) {
        for (ChatDto chatDto : chatList) {
            mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
            Chat chat = mapper.map(chatDto, Chat.class);

            chatRepository.save(chat);
        }

    }
}
