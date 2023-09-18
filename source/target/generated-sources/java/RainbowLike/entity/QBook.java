package RainbowLike.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QBook is a Querydsl query type for Book
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBook extends EntityPathBase<Book> {

    private static final long serialVersionUID = -478199789L;

    public static final QBook book = new QBook("book");

    public final StringPath author = createString("author");

    public final StringPath book_div = createString("book_div");

    public final StringPath bookName = createString("bookName");

    public final NumberPath<Long> bookNum = createNumber("bookNum", Long.class);

    public final StringPath ctgr = createString("ctgr");

    public final DateTimePath<java.time.LocalDateTime> publishedDate = createDateTime("publishedDate", java.time.LocalDateTime.class);

    public final StringPath publisher = createString("publisher");

    public QBook(String variable) {
        super(Book.class, forVariable(variable));
    }

    public QBook(Path<? extends Book> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBook(PathMetadata metadata) {
        super(Book.class, metadata);
    }

}

