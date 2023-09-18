package RainbowLike.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = 317123908L;

    public static final QMember member = new QMember("member1");

    public final StringPath addr = createString("addr");

    public final StringPath addrDtl = createString("addrDtl");

    public final StringPath addrPost = createString("addrPost");

    public final DatePath<java.time.LocalDate> bir = createDate("bir", java.time.LocalDate.class);

    public final ListPath<Chat, QChat> chats = this.<Chat, QChat>createList("chats", Chat.class, QChat.class, PathInits.DIRECT2);

    public final ListPath<Comment, QComment> comments = this.<Comment, QComment>createList("comments", Comment.class, QComment.class, PathInits.DIRECT2);

    public final ListPath<EduHist, QEduHist> eduHists = this.<EduHist, QEduHist>createList("eduHists", EduHist.class, QEduHist.class, PathInits.DIRECT2);

    public final StringPath email = createString("email");

    public final ListPath<File, QFile> files = this.<File, QFile>createList("files", File.class, QFile.class, PathInits.DIRECT2);

    public final ListPath<FtConsumer, QFtConsumer> ftConsumers = this.<FtConsumer, QFtConsumer>createList("ftConsumers", FtConsumer.class, QFtConsumer.class, PathInits.DIRECT2);

    public final ListPath<FtWorker, QFtWorker> ftWorkers = this.<FtWorker, QFtWorker>createList("ftWorkers", FtWorker.class, QFtWorker.class, PathInits.DIRECT2);

    public final EnumPath<RainbowLike.constant.Gender> gender = createEnum("gender", RainbowLike.constant.Gender.class);

    public final DatePath<java.time.LocalDate> jdate = createDate("jdate", java.time.LocalDate.class);

    public final StringPath memId = createString("memId");

    public final NumberPath<Long> memNum = createNumber("memNum", Long.class);

    public final StringPath name = createString("name");

    public final ListPath<Post, QPost> posts = this.<Post, QPost>createList("posts", Post.class, QPost.class, PathInits.DIRECT2);

    public final StringPath pwd = createString("pwd");

    public final ListPath<RentHist, QRentHist> rentHists = this.<RentHist, QRentHist>createList("rentHists", RentHist.class, QRentHist.class, PathInits.DIRECT2);

    public final StringPath tel = createString("tel");

    public final EnumPath<RainbowLike.constant.Type> type = createEnum("type", RainbowLike.constant.Type.class);

    public QMember(String variable) {
        super(Member.class, forVariable(variable));
    }

    public QMember(Path<? extends Member> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMember(PathMetadata metadata) {
        super(Member.class, metadata);
    }

}

