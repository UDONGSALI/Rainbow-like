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
    private int readRole;

    @Column( nullable = false)
    private int writeRole;

    @Column( nullable = false)
    private int editRole;

    @Column(nullable = false)
    private byte commAllowYn;

    public Board(String boardName, int readRole, int writeRole, int editRole, byte commAllowYn) {
        super();
        this.boardName = boardName;
        this.readRole = readRole;
        this.writeRole = writeRole;
        this.editRole = editRole;
        this.commAllowYn = commAllowYn;
    }
}
