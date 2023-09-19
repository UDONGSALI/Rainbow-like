package RainbowLike.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSmsRecepTel is a Querydsl query type for SmsRecepTel
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSmsRecepTel extends EntityPathBase<SmsRecepTel> {

    private static final long serialVersionUID = -1261893393L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSmsRecepTel smsRecepTel = new QSmsRecepTel("smsRecepTel");

    public final StringPath recepTel = createString("recepTel");

    public final QSmsHist smsHist;

    public final NumberPath<Long> smsRecepTelNum = createNumber("smsRecepTelNum", Long.class);

    public QSmsRecepTel(String variable) {
        this(SmsRecepTel.class, forVariable(variable), INITS);
    }

    public QSmsRecepTel(Path<? extends SmsRecepTel> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSmsRecepTel(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSmsRecepTel(PathMetadata metadata, PathInits inits) {
        this(SmsRecepTel.class, metadata, inits);
    }

    public QSmsRecepTel(Class<? extends SmsRecepTel> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.smsHist = inits.isInitialized("smsHist") ? new QSmsHist(forProperty("smsHist")) : null;
    }

}

