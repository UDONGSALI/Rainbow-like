
import React, { useState, useEffect } from "react";
import '../../../css/component/Club/ClubForm.css';
import { useParams } from "react-router-dom";
import { SERVER_URL } from "../Common/constants";


function Comment() {
    const { id } = useParams();
    const [comms, setComms] = useState([]);
    const [open, setOpen] = useState(false);

    const [replyFormData, setReplyFormData] = useState({
        postNum: id,
        memNum: 1, // 여기에 작성자의 멤버 번호를 넣어주세요.
        content: '',
        parentNum: '0',
        delYN: 'N',
    });
    const [showReply, setShowReply] = useState({});
    const [showEditForm, setShowEditForm] = useState({});
    const [editMode, setEditMode] = useState({});

    useEffect(() => {
        fetchComms();
    }, []);

    const fetchComms = () => {
        fetch(SERVER_URL + "postnumcomm/" + id)
            .then((response) => response.json())
            .then((data) => {
                const commentTree = buildCommentTree(data);
                setComms(commentTree);
            })
            .catch((err) => console.error(err));
    };

    const buildCommentTree = (comments) => {
        const commentMap = new Map();
        const commentTree = [];

        comments.forEach((comment) => {
            commentMap.set(comment.commNum, comment);
        });

        comments.forEach((comment) => {
            if (comment.parentNum === 0) {
                commentTree.push(comment);
            } else {
                const parentComment = commentMap.get(comment.parentNum);
                if (parentComment) {
                    if (!parentComment.children) {
                        parentComment.children = [];
                    }
                    parentComment.children.push(comment);
                }
            }
        });

        return commentTree;
    };

    const onDelClick = (comment) => {
        const updatedCommentData = {
            editDate: new Date(),
            content : comment.content,
            delYN : 'Y',
            memNum : comment.member.memNum,
            parentNum : comment.parentNum,
            postNum : comment.postNum
        };

        // PUT 요청 보내기
        fetch("http://localhost:8090/api/comments/" + comment.commNum, {
            method: 'PUT', // PUT 요청을 사용
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCommentData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                alert('댓글을 삭제했습니다.');
                fetchComms();
                setOpen(true);
            })
            .catch((error) => {
                console.error('댓글 삭제 중 오류 발생:', error);
            });
    };

    // const onEditClick = (comment) => {
    //     // 댓글 수정 모드를 토글
    //     comment.isEditMode = !comment.isEditMode;
    //     // 댓글 수정 모드 상태를 갱신하기 위해 댓글 객체를 복사한 후 상태를 업데이트
    //     setComms((prevComms) =>
    //         prevComms.map((prevComment) =>
    //             prevComment.commNum === comment.commNum ? { ...comment } : prevComment
    //         )
    //     );
    // };

    const [formData, setFormData] = useState({
        postNum: id,
        memNum: 1,
        content: '',
        parentNum: '0',
        delYN : 'N'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8090/comments/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                alert('댓글을 작성했습니다.');

                setFormData({
                    postNum: id,
                    memNum: 1,
                    content: '',
                    parentNum: '0',
                    delYN : 'N'
                });
                fetchComms();
                setOpen(true);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleReplyChange = (e) => {
        const { name, value } = e.target;
        setReplyFormData({ ...replyFormData, [name]: value });
    };

    const onReplyClick = (comment) => {
        setReplyFormData({
            ...replyFormData,
            parentNum: comment.commNum,
        });
        setShowReply((prevShowReply) => ({
            ...prevShowReply,
            [comment.commNum]: !prevShowReply[comment.commNum],
        }));
    };

    const onPostReply = (comment) => {
        fetch('http://localhost:8090/comments/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(replyFormData),
        })
            .then((response) => response.json())
            .then((data) => {
                setReplyFormData({
                    postNum: id,
                    memNum: 1,
                    content: '',
                    parentNum: '0',
                    delYN : 'N'
                });
                alert('답글을 작성했습니다.');

                fetchComms();

                setOpen(true);
                setShowReply({ [comment.commNum]: false });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };






    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditMode({ ...replyFormData, [name]: value });
    };

    // const onEditClick = (comment) => {
    //     setEditMode({
    //         editDate: new Date(),
    //         content : comment.content,
    //         delYN : comment.delYN,
    //         memNum : comment.member.memNum,
    //         parentNum : comment.parentNum,
    //         postNum : comment.postNum
    //     });
    //     setShowReply((prevShowEditForm) => ({
    //         ...prevShowEditForm,
    //         [comment.commNum]: !prevShowEditForm[comment.commNum],
    //     }));
    // };

    const onEditClick = (comment) => {
        // 댓글 수정 모드를 토글
        const isEditMode = !editMode[comment.commNum];
        setEditMode((prevEditMode) => ({
            ...prevEditMode,
            [comment.commNum]: isEditMode,
        }));
    };

    const onEditComm = (comment) => {
        fetch(SERVER_URL + "api/comment/" + comment.commNum, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editMode),
        })
            .then((response) => response.json())
            .then((data) => {
                setEditMode({
                    postNum: id,
                    memNum: 1,
                    content: '',
                    parentNum: '0',
                    delYN : 'N'
                });
                alert('답글을 수정했습니다.');

                fetchComms();

                setOpen(true);
                setShowEditForm({ [comment.commNum]: false });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };








    const renderCommentContent = (comment) => {
        if (comment.delYN === 'Y' && (!comment.children || comment.children.length === 0)) {
            return "삭제된 댓글입니다.";
        }
        return comment.content;
    };

    const renderComments = (comments, level = 0) => {
        return comments.map((comment) => (
            <React.Fragment key={comment.commNum}>
                {(comment.delYN === 'N' || (comment.delYN === 'Y' && comment.children && comment.children.length > 0)) && (
                    <tr>
                        <td width={100}>{comment.commNum}</td>
                        <td width={100}>{comment.member.name}</td>
                        <td width={400} style={{ paddingLeft: `${level * 20}px` }}>
                            {comment.delYN === 'Y' ? "삭제된 댓글입니다." : (
                                comment.isEditMode ? (
                                    <>
                                        {/* 수정 모드일 때 textarea를 표시하고 댓글 내용을 기본값으로 설정 */}
                                        <textarea
                                            name="content"
                                            cols="40"
                                            value={comment.content}
                                            onChange={(e) => handleEditChange(e, comment)}
                                        />
                                        <br />
                                        <button onClick={() => onEditComm(comment)}>저장</button>
                                    </>
                                ) : (
                                    renderCommentContent(comment)
                                )
                            )}
                        </td>
                        <td width={100}>{comment.parentNum}</td>
                        <td>
                            <button onClick={() => onReplyClick(comment)}>답글</button>
                        </td>
                        <td>
                            {/* 수정 버튼 클릭 시 editMode[comment.commNum]을 true로 설정 */}
                            <button onClick={() => onEditClick(comment)}>수정</button>
                        </td>
                        <td>
                            <button onClick={() => onDelClick(comment)}>삭제</button>
                        </td>
                    </tr>
                )}
                {showReply[comment.commNum] && (
                    <tr>
                        <td colSpan={7}>
                    <textarea
                        name="content"
                        cols="100"
                        value={replyFormData.content}
                        onChange={handleReplyChange}
                    />
                            <button onClick={() => onPostReply(comment)}>작성</button>
                        </td>
                    </tr>
                )}
                {showEditForm[comment] && (
                    <tr>
                        <td colSpan={7}>
                    <textarea
                        name="content"
                        cols="40"
                        value={comment.content}
                        onChange={(e) => handleEditChange(e, comment)}
                    />
                            <br />
                            <button onClick={() => onEditComm(comment)}>저장</button>
                        </td>
                    </tr>
                )}
                {comment.children && comment.children.length > 0 && (
                    <tr>
                        <td colSpan={7}>
                            <table>
                                <tbody>
                                {renderComments(comment.children, level + 1)}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                )}
            </React.Fragment>
        ));
    };

    return (
        <div className="comment">
            <div className="commList">
                <table>
                    <thead>
                    <tr>
                        <th>댓글 번호</th>
                        <th>작성자</th>
                        <th>댓글 본문</th>
                        <th>부모 번호</th>
                        <th>답글</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderComments(comms)}
                    </tbody>
                </table>
            </div>
            <form onSubmit={handleSubmit} className="comment-form">
                <textarea
                    name="content"
                    cols="100"
                    value={formData.content}
                    onChange={handleChange}
                />
                <button type="submit">댓글 작성</button>
            </form>
        </div>
    );
}

export default Comment;
