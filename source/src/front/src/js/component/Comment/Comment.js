import React, { useState, useEffect } from "react";
import '../../../css/component/Club/ClubForm.css';
import { useParams } from "react-router-dom";
import { SERVER_URL } from "../Common/constants";
import Snackbar from "@mui/material/Snackbar";

function Comment() {
    const { id } = useParams();
    const [comms, setComms] = useState([]);
    const [open, setOpen] = useState(false);
    const [replyFormData, setReplyFormData] = useState({
        postNum: id,
        memNum: 1,
        content: '',
        parentNum: '0',
        delYN: 'N',
    });
    const [showReply, setShowReply] = useState({});

    const [editFormData, setEditFormData] = useState({
        postNum: id,
        memNum: 1,
        content: '',
        parentNum: '0',
        delYN: 'N',
    });
    const [showEditForm, setShowEditForm] = useState({});



    useEffect(() => {
        fetchComms();
    }, []);


//데이터 불러오기
    const fetchComms = () => {
        fetch(SERVER_URL + "postnumcomm/" + id)
            .then((response) => response.json())
            .then((data) => {
                const commentTree = buildCommentTree(data);
                setComms(commentTree);
            })
            .catch((err) => console.error(err));
    };

// 데이터 편집
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

//댓글 삭제(delYN = Y)
    const onDelClick = (comment) => {
        console.log(comment);
        const updatedCommentData = {

            editDate: new Date(),
            content : comment.content,
            delYN : 'Y',
            memNum : comment.member.memNum,
            parentNum : comment.parentNum,
            postNum : comment.post.postNum
        };

        // PUT 요청 보내기
        fetch(SERVER_URL + "comm/" + comment.commNum, {
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


// 댓글 작성
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


//답글 작성
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





//댓글 수정


    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const onEditClick = (comment) => {
        setEditFormData({               // 해당 댓글 정보 가져오기
            postNum: comment.post.postNum,
            memNum: comment.member.memNum,
            content: comment.content,
            parentNum: comment.parentNum,
            delYN: comment.delYN
        });
        setShowEditForm((prevShowEditForm) => ({
            ...prevShowEditForm,
            [comment.commNum]: !prevShowEditForm[comment.commNum],
        }));
    };

    const onPostEdit = (comment) => {
        const updatedCommentData = {

            editDate: new Date(),
            content : editFormData.content,
            delYN : comment.delYN,
            memNum : comment.member.memNum,
            parentNum : comment.parentNum,
            postNum : comment.post.postNum

        };
        console.log(updatedCommentData);


        fetch(SERVER_URL + "comm/" + comment.commNum, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCommentData),
        })
            .then((response) => response.json())
            .then((data) => {
                setEditFormData({
                    postNum: id,
                    memNum: 1,
                    content: '',
                    parentNum: '0',
                    delYN : 'N'
                });
                alert('댓글을 수정했습니다.');

                fetchComms();

                setOpen(true);
                setShowEditForm({ [comment.commNum]: false });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };







// 댓글 편집출력
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
                            {comment.delYN === 'Y' ? "삭제된 댓글입니다." : renderCommentContent(comment)}
                        </td>
                        <td width={100}>{comment.parentNum}</td>
                        <td>
                            {comment.delYN === 'N' && (
                                <button onClick={() => onReplyClick(comment)}>답글</button>
                            )}
                        </td>
                        <td>
                            {comment.delYN === 'N' && (
                                <button onClick={() => onEditClick(comment)}>수정</button>
                            )}
                        </td>
                        <td>
                            {comment.delYN === 'N' && (
                                <button onClick={() => onDelClick(comment)}>삭제</button>
                            )}
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
                {showEditForm[comment.commNum] && (
                    <tr>
                        <td colSpan={7}>
                        <textarea
                            name="content"
                            cols="100"
                            value={editFormData.content}
                            onChange={handleEditChange}
                        />
                            <button onClick={() => onPostEdit(comment)}>저장</button>
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
                        {/*<th>댓글 번호</th>*/}
                        {/*<th>작성자</th>*/}
                        {/*<th>댓글 본문</th>*/}
                        {/*<th>부모 번호</th>*/}
                        {/*<th>답글</th>*/}
                        {/*<th>수정</th>*/}
                        {/*<th>삭제</th>*/}
                    </tr>
                    </thead>
                    <tbody>
                    {comms.length === 0 ? (
                        <tr>
                            <td colSpan={7}>아직 댓글이 없습니다. 첫번째 댓글을 작성해보세요!</td>
                            <br/>
                        </tr>
                    ) : (
                        renderComments(comms)
                    )}                    </tbody>
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