package RainbowLike.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPost is a Querydsl query type for Post
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPost extends EntityPathBase<Post> {

    private static final long serialVersionUID = -477782582L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPost post = new QPost("post");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final QBoard board;

    public final StringPath clubAllowStatus = createString("clubAllowStatus");

    public final StringPath clubRecuStatus = createString("clubRecuStatus");

    public final ListPath<Comment, QComment> comments = this.<Comment, QComment>createList("comments", Comment.class, QComment.class, PathInits.DIRECT2);

    public final StringPath consField = createString("consField");

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> editDate = _super.editDate;

    public final ListPath<File, QFile> files = this.<File, QFile>createList("files", File.class, QFile.class, PathInits.DIRECT2);

    public final QMember member;

    public final NumberPath<Integer> pageView = createNumber("pageView", Integer.class);

    public final NumberPath<Long> parentsNum = createNumber("parentsNum", Long.class);

    public final NumberPath<Long> postNum = createNumber("postNum", Long.class);

    public final StringPath title = createString("title");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> writeDate = _super.writeDate;

    public QPost(String variable) {
        this(Post.class, forVariable(variable), INITS);
    }

    public QPost(Path<? extends Post> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPost(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPost(PathMetadata metadata, PathInits inits) {
        this(Post.class, metadata, inits);
    }

    public QPost(Class<? extends Post> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.board = inits.isInitialized("board") ? new QBoard(forProperty("board")) : null;
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
    }

}

