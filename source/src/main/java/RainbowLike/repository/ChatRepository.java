package RainbowLike.repository;

import RainbowLike.entity.Chat;
import RainbowLike.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepository extends JpaRepository <Chat,Long> {
    Iterable<Chat> findByChatRoom(ChatRoom chatRoom);
}
