package RainbowLike.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFemaleTalentMatching is a Querydsl query type for FemaleTalentMatching
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFemaleTalentMatching extends EntityPathBase<FemaleTalentMatching> {

    private static final long serialVersionUID = -1299957601L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFemaleTalentMatching femaleTalentMatching = new QFemaleTalentMatching("femaleTalentMatching");

    public final QFtConsumer ftConsumer;

    public final NumberPath<Long> ftmNum = createNumber("ftmNum", Long.class);

    public final QFtWorker ftWorker;

    public QFemaleTalentMatching(String variable) {
        this(FemaleTalentMatching.class, forVariable(variable), INITS);
    }

    public QFemaleTalentMatching(Path<? extends FemaleTalentMatching> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFemaleTalentMatching(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFemaleTalentMatching(PathMetadata metadata, PathInits inits) {
        this(FemaleTalentMatching.class, metadata, inits);
    }

    public QFemaleTalentMatching(Class<? extends FemaleTalentMatching> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.ftConsumer = inits.isInitialized("ftConsumer") ? new QFtConsumer(forProperty("ftConsumer"), inits.get("ftConsumer")) : null;
        this.ftWorker = inits.isInitialized("ftWorker") ? new QFtWorker(forProperty("ftWorker"), inits.get("ftWorker")) : null;
    }

}

