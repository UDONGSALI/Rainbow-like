package RainbowLike.entity;

import RainbowLike.constant.Gender;
import RainbowLike.constant.Type;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long memNum;

    @Column(unique = true, length = 50, nullable = false)
    private String memId;

    @Column(nullable = false,length = 100)
    private String pwd;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Type type;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(nullable = false, length = 10)
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(nullable = false)
    private LocalDate bir;

    @Column(nullable = false, length = 30)
    private String tel;

    @Column(unique = true, nullable = false,length = 100)
    private String email;

    @Column(nullable = false)
    private String addr;

    private String addrDtl;

    private String addrPost;

    @Column(nullable = false)
    private LocalDate jdate;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    @JsonBackReference(value="member-files")
    private List<File> files = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    @JsonBackReference(value="member-posts")
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    @JsonBackReference(value="member-comments")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    @JsonBackReference(value="member-chats")
    private List<Chat> chats = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    @JsonBackReference(value="member-eduHists")
    private List<EduHist> eduHists = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    @JsonBackReference(value="member-rentHists")
    private List<RentHist> rentHists = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    @JsonBackReference(value="member-ftWorkers")
    private List<FtWorker> ftWorkers = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    @JsonBackReference(value="member-ftConsumers")
    private List<FtConsumer> ftConsumers = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    @JsonBackReference(value="member-logs")
    private List<Log> logs = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    @JsonBackReference(value="member-chat")
    private List<Chat> chat = new ArrayList<>();



    public Member(String memId, String pwd, Type type, String name, Gender gender, LocalDate bir, String tel, String email, String addr, String addrDtl, LocalDate jdate) {
        super();
        this.memId = memId;
        this.pwd = pwd;
        this.type = type;
        this.name = name;
        this.gender = gender;
        this.bir = bir;
        this.email = email;
        this.tel = tel ;
        this.addr = addr;
        this.addrDtl =addrDtl;
        this.jdate = jdate;
    }


}
