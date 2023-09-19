package RainbowLike.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QEduHist is a Querydsl query type for EduHist
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QEduHist extends EntityPathBase<EduHist> {

    private static final long serialVersionUID = -1586167154L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QEduHist eduHist = new QEduHist("eduHist");

    public final DateTimePath<java.time.LocalDateTime> applyDate = createDateTime("applyDate", java.time.LocalDateTime.class);

    public final StringPath applyStatus = createString("applyStatus");

    public final QEdu edu;

    public final NumberPath<Long> eduHistNum = createNumber("eduHistNum", Long.class);

    public final QMember member;

    public QEduHist(String variable) {
        this(EduHist.class, forVariable(variable), INITS);
    }

    public QEduHist(Path<? extends EduHist> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QEduHist(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QEduHist(PathMetadata metadata, PathInits inits) {
        this(EduHist.class, metadata, inits);
    }

    public QEduHist(Class<? extends EduHist> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.edu = inits.isInitialized("edu") ? new QEdu(forProperty("edu")) : null;
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
    }

}

