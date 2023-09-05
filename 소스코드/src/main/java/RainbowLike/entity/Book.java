package RainbowLike.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long bookNum;

    @Column(nullable = false)
    private String bookName;

    @Column(nullable = false, length = 50)
    private String author;

    @Column(nullable = false, length = 50)
    private String publisher;

    @Column(nullable = false)
    private LocalDateTime publishedDate;

    @Column(nullable = false, length = 50)
    private String ctgr;

    @Column(nullable = false, length = 50)
    private String book_div;
}
