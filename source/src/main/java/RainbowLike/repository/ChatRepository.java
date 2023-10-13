package RainbowLike.repository;

import RainbowLike.entity.Chat;
import RainbowLike.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepository extends JpaRepository <Chat,Long> {
    Iterable<Chat> findByChatRoom(ChatRoom chatRoom);

    @Modifying
    @Query("SELECT c.chatNum, c.content, c.member FROM Chat c INNER JOIN ChatRoom r ON r.chatRoomId = c.chatRoom.chatRoomId WHERE r.member.memNum = :memNum  ORDER BY c.chatNum ASC")
    Iterable<Chat> findByMemNum(Long memNum);

    Iterable<Chat> findByChatRoomMemberMemNumOrderByChatNumAsc(Long memNum);

}
