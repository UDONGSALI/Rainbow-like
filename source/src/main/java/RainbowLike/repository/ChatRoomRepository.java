package RainbowLike.repository;

import RainbowLike.entity.ChatRoom;
import RainbowLike.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomRepository extends JpaRepository <ChatRoom,Long> {
    Iterable<ChatRoom> findByMember(Member member);
}
