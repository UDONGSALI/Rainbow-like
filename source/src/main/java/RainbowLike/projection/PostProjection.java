package RainbowLike.projection;

import java.time.LocalDateTime;

public interface PostProjection {
    String title();
    String content();
    LocalDateTime writeDate();
    String clubAllowStatus();
    String clubRecuStatus();
    // board 정보 필드 추가
    String name();
    Long board();
    String boardName();

}
