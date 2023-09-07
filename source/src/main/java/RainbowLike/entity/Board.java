package RainbowLike.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long boardNum;

    @Column(length = 50, nullable = false)
    private String boardName;

    @Column( nullable = false)
    private boolean readRole;

    @Column( nullable = false)
    private boolean writeRole;

    @Column(nullable = false)
    private boolean commAllowYn;

    public Board(String boardName, boolean readRole, boolean writeRole, boolean commAllowYn) {
        super();
        this.boardName = boardName;
        this.readRole = readRole;
        this.writeRole = writeRole;
        this.commAllowYn = commAllowYn;
    }
}
