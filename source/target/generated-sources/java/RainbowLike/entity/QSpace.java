package RainbowLike.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSpace is a Querydsl query type for Space
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSpace extends EntityPathBase<Space> {

    private static final long serialVersionUID = -1923575524L;

    public static final QSpace space = new QSpace("space");

    public final StringPath facilities = createString("facilities");

    public final ListPath<File, QFile> files = this.<File, QFile>createList("files", File.class, QFile.class, PathInits.DIRECT2);

    public final NumberPath<Integer> maxPerson = createNumber("maxPerson", Integer.class);

    public final StringPath rentFee = createString("rentFee");

    public final ListPath<RentHist, QRentHist> rentHists = this.<RentHist, QRentHist>createList("rentHists", RentHist.class, QRentHist.class, PathInits.DIRECT2);

    public final StringPath rentTime = createString("rentTime");

    public final StringPath spaceName = createString("spaceName");

    public final NumberPath<Long> spaceNum = createNumber("spaceNum", Long.class);

    public final StringPath spaceUsage = createString("spaceUsage");

    public QSpace(String variable) {
        super(Space.class, forVariable(variable));
    }

    public QSpace(Path<? extends Space> path) {
        super(path.getType(), path.getMetadata());
    }

    public QSpace(PathMetadata metadata) {
        super(Space.class, metadata);
    }

}

