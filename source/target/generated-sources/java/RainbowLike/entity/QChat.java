package RainbowLike.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChat is a Querydsl query type for Chat
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChat extends EntityPathBase<Chat> {

    private static final long serialVersionUID = -478177150L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QChat chat = new QChat("chat");

    public final DateTimePath<java.time.LocalDateTime> applyDate = createDateTime("applyDate", java.time.LocalDateTime.class);

    public final StringPath applyStatus = createString("applyStatus");

    public final NumberPath<Long> chatNum = createNumber("chatNum", Long.class);

    public final StringPath consContent = createString("consContent");

    public final QMember member;

    public final DateTimePath<java.time.LocalDateTime> resDate = createDateTime("resDate", java.time.LocalDateTime.class);

    public QChat(String variable) {
        this(Chat.class, forVariable(variable), INITS);
    }

    public QChat(Path<? extends Chat> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QChat(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QChat(PathMetadata metadata, PathInits inits) {
        this(Chat.class, metadata, inits);
    }

    public QChat(Class<? extends Chat> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
    }

}

