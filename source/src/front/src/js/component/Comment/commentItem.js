import React from "react";

const CommentItem = ({ commNum, parentNum, content }) => {
    // 들여쓰기를 결정하는 CSS 클래스 생성
    const indentationClass = parentNum ? 'indented-comment' : '';

    return (
        <div className={`comment-item ${indentationClass}`}>
            <p>{content}</p>
        </div>
    );
};

export default CommentItem;