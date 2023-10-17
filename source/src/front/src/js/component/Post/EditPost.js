import React, { useState, useEffect } from 'react';
import { SERVER_URL } from '../Common/constants';

function EditPost(props) {
    const { postNum } = props.match.params;  // react-router를 사용하면 match 객체를 통해 파라미터를 받아올 수 있습니다.
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        fetch(`${SERVER_URL}posts/${postNum}`)
            .then(response => response.json())
            .then(data => {
                setTitle(data.title);
                setContent(data.content);
            })
            .catch(error => console.error(error));
    }, [postNum]);

    const handleSave = () => {
        // API 호출을 통해 게시글을 수정하는 로직을 추가하세요.
        const handleSave = () => {
            // 1. 입력 폼 데이터 준비
            const updatedPost = {
                title: title,
                content: content
            };
            // 2. API 호출
            fetch(`${SERVER_URL}posts/${postNum}`, {
                method: 'PUT',  // PUT 메서드를 사용하여 리소스를 업데이트합니다.
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedPost)  // 제목과 내용을 JSON 형태로 변환하여 서버에 전송합니다.
            })
                .then(response => {
                    if (response.ok) {
                        alert('게시글이 성공적으로 수정되었습니다.');
                        // 게시글이 성공적으로 수정된 후, 원하는 페이지나 액션으로 리디렉션 할 수 있습니다.
                        // 예: 게시글 상세 페이지로 이동
                        // navigate(`/posts/${postNum}`);
                    } else {
                        alert('게시글 수정에 실패하였습니다. 다시 시도해 주세요.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('오류가 발생했습니다. 다시 시도해 주세요.');
                });
        };
    };

    return (
        <div>
            <input value={title} onChange={e => setTitle(e.target.value)} />
            <textarea value={content} onChange={e => setContent(e.target.value)} />
            <button onClick={handleSave}>저장</button>
        </div>
    );
}

export default EditPost;
