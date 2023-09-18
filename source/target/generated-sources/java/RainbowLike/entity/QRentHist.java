package RainbowLike.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRentHist is a Querydsl query type for RentHist
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRentHist extends EntityPathBase<RentHist> {

    private static final long serialVersionUID = -18101723L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRentHist rentHist = new QRentHist("rentHist");

    public final DateTimePath<java.time.LocalDateTime> applyDate = createDateTime("applyDate", java.time.LocalDateTime.class);

    public final StringPath applyStatus = createString("applyStatus");

    public final QMember member;

    public final ListPath<PayHist, QPayHist> payHists = this.<PayHist, QPayHist>createList("payHists", PayHist.class, QPayHist.class, PathInits.DIRECT2);

    public final StringPath payStatus = createString("payStatus");

    public final DateTimePath<java.time.LocalDateTime> rentEddt = createDateTime("rentEddt", java.time.LocalDateTime.class);

    public final NumberPath<Long> rentHistNum = createNumber("rentHistNum", Long.class);

    public final DateTimePath<java.time.LocalDateTime> rentStdt = createDateTime("rentStdt", java.time.LocalDateTime.class);

    public final QSpace space;

    public QRentHist(String variable) {
        this(RentHist.class, forVariable(variable), INITS);
    }

    public QRentHist(Path<? extends RentHist> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRentHist(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRentHist(PathMetadata metadata, PathInits inits) {
        this(RentHist.class, metadata, inits);
    }

    public QRentHist(Class<? extends RentHist> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member")) : null;
        this.space = inits.isInitialized("space") ? new QSpace(forProperty("space")) : null;
    }

}

