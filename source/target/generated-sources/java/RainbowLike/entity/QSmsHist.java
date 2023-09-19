package RainbowLike.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSmsHist is a Querydsl query type for SmsHist
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSmsHist extends EntityPathBase<SmsHist> {

    private static final long serialVersionUID = -1790202191L;

    public static final QSmsHist smsHist = new QSmsHist("smsHist");

    public final StringPath content = createString("content");

    public final DateTimePath<java.time.LocalDateTime> sendDate = createDateTime("sendDate", java.time.LocalDateTime.class);

    public final StringPath sendTel = createString("sendTel");

    public final NumberPath<Long> smsHistNum = createNumber("smsHistNum", Long.class);

    public final ListPath<SmsRecepTel, QSmsRecepTel> smsRecepTels = this.<SmsRecepTel, QSmsRecepTel>createList("smsRecepTels", SmsRecepTel.class, QSmsRecepTel.class, PathInits.DIRECT2);

    public final StringPath smsType = createString("smsType");

    public QSmsHist(String variable) {
        super(SmsHist.class, forVariable(variable));
    }

    public QSmsHist(Path<? extends SmsHist> path) {
        super(path.getType(), path.getMetadata());
    }

    public QSmsHist(PathMetadata metadata) {
        super(SmsHist.class, metadata);
    }

}

