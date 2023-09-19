package RainbowLike.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFtWorker is a Querydsl query type for FtWorker
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFtWorker extends EntityPathBase<FtWorker> {

    private static final long serialVersionUID = 308828694L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFtWorker ftWorker = new QFtWorker("ftWorker");

    public final QBaseEntity _super = new QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> editDate = _super.editDate;

    public final ListPath<FemaleTalentMatching, QFemaleTalentMatching> femaleTalentMatchings = this.<FemaleTalentMatching, QFemaleTalentMatching>createList("femaleTalentMatchings", FemaleTalentMatching.class, QFemaleTalentMatching.class, PathInits.DIRECT2);

    public final StringPath ftDtl = createString("ftDtl");

    public final BooleanPath ftmYn = createBoolean("ftmYn");

    public final NumberPath<Long> ftWorkerNum = createNumber("ftWorkerNum", Long.class);

    public final StringPath licenseDtl = createString("licenseDtl");

    public final BooleanPath licenseYn = createBoolean("licenseYn");

    public final QMember member;

    public final StringPath speField = createString("speField");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> writeDate = _super.writeDate;

    public QFtWorker(String variable) {
        this(FtWorker.class, forVariable(variable), INITS);
    }

    public QFtWorker(Path<? extends FtWorker> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFtWorker(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFtWorker(PathMetadata metadata, PathInits inits) {
        this(FtWorker.class, metadata, inits);
    }

    public QFtWorker(Class<? extends FtWorker> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
    }

}

