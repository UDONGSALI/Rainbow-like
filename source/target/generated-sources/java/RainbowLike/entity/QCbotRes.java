package RainbowLike.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QCbotRes is a Querydsl query type for CbotRes
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCbotRes extends EntityPathBase<CbotRes> {

    private static final long serialVersionUID = 872281618L;

    public static final QCbotRes cbotRes = new QCbotRes("cbotRes");

    public final NumberPath<Long> cbotResNum = createNumber("cbotResNum", Long.class);

    public final StringPath resContnet = createString("resContnet");

    public final StringPath resCtgr = createString("resCtgr");

    public final StringPath resTitle = createString("resTitle");

    public QCbotRes(String variable) {
        super(CbotRes.class, forVariable(variable));
    }

    public QCbotRes(Path<? extends CbotRes> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCbotRes(PathMetadata metadata) {
        super(CbotRes.class, metadata);
    }

}

