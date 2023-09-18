package RainbowLike.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFtConsumer is a Querydsl query type for FtConsumer
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFtConsumer extends EntityPathBase<FtConsumer> {

    private static final long serialVersionUID = -171490162L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFtConsumer ftConsumer = new QFtConsumer("ftConsumer");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final StringPath applyContent = createString("applyContent");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> editDate = _super.editDate;

    public final ListPath<FemaleTalentMatching, QFemaleTalentMatching> femaleTalentMatchings = this.<FemaleTalentMatching, QFemaleTalentMatching>createList("femaleTalentMatchings", FemaleTalentMatching.class, QFemaleTalentMatching.class, PathInits.DIRECT2);

    public final NumberPath<Long> ftConsumerNum = createNumber("ftConsumerNum", Long.class);

    public final BooleanPath ftmYn = createBoolean("ftmYn");

    public final QMember member;

    public final StringPath speField = createString("speField");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> writeDate = _super.writeDate;

    public QFtConsumer(String variable) {
        this(FtConsumer.class, forVariable(variable), INITS);
    }

    public QFtConsumer(Path<? extends FtConsumer> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFtConsumer(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFtConsumer(PathMetadata metadata, PathInits inits) {
        this(FtConsumer.class, metadata, inits);
    }

    public QFtConsumer(Class<? extends FtConsumer> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
    }

}

