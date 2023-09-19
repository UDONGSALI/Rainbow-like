package RainbowLike.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPayHist is a Querydsl query type for PayHist
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPayHist extends EntityPathBase<PayHist> {

    private static final long serialVersionUID = -495754624L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPayHist payHist = new QPayHist("payHist");

    public final NumberPath<Integer> fee = createNumber("fee", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> payDate = createDateTime("payDate", java.time.LocalDateTime.class);

    public final NumberPath<Long> payHistNum = createNumber("payHistNum", Long.class);

    public final QRentHist rentHist;

    public QPayHist(String variable) {
        this(PayHist.class, forVariable(variable), INITS);
    }

    public QPayHist(Path<? extends PayHist> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPayHist(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPayHist(PathMetadata metadata, PathInits inits) {
        this(PayHist.class, metadata, inits);
    }

    public QPayHist(Class<? extends PayHist> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.rentHist = inits.isInitialized("rentHist") ? new QRentHist(forProperty("rentHist"), inits.get("rentHist")) : null;
    }

}

