package RainbowLike.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QEdu is a Querydsl query type for Edu
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QEdu extends EntityPathBase<Edu> {

    private static final long serialVersionUID = -985254580L;

    public static final QEdu edu = new QEdu("edu");

    public final NumberPath<Integer> capacity = createNumber("capacity", Integer.class);

    public final StringPath content = createString("content");

    public final StringPath eduAddr = createString("eduAddr");

    public final DateTimePath<java.time.LocalDateTime> eduEddt = createDateTime("eduEddt", java.time.LocalDateTime.class);

    public final ListPath<EduHist, QEduHist> eduHists = this.<EduHist, QEduHist>createList("eduHists", EduHist.class, QEduHist.class, PathInits.DIRECT2);

    public final StringPath eduName = createString("eduName");

    public final NumberPath<Long> eduNum = createNumber("eduNum", Long.class);

    public final DateTimePath<java.time.LocalDateTime> eduStdt = createDateTime("eduStdt", java.time.LocalDateTime.class);

    public final ListPath<File, QFile> files = this.<File, QFile>createList("files", File.class, QFile.class, PathInits.DIRECT2);

    public final DatePath<java.time.LocalDate> recuEddt = createDate("recuEddt", java.time.LocalDate.class);

    public final EnumPath<RainbowLike.constant.RecuMethod> recuMethod = createEnum("recuMethod", RainbowLike.constant.RecuMethod.class);

    public final NumberPath<Integer> recuPerson = createNumber("recuPerson", Integer.class);

    public final DatePath<java.time.LocalDate> recuStdt = createDate("recuStdt", java.time.LocalDate.class);

    public final StringPath target = createString("target");

    public final StringPath tel = createString("tel");

    public final EnumPath<RainbowLike.constant.EduType> type = createEnum("type", RainbowLike.constant.EduType.class);

    public QEdu(String variable) {
        super(Edu.class, forVariable(variable));
    }

    public QEdu(Path<? extends Edu> path) {
        super(path.getType(), path.getMetadata());
    }

    public QEdu(PathMetadata metadata) {
        super(Edu.class, metadata);
    }

}

