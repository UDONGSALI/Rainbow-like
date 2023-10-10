import React, { useState, useEffect } from 'react';
import styles from '../../../css/component/Chat/Chat.module.css';
import { SERVER_URL } from '../Common/constants';
import {useNavigate} from "react-router-dom";

function ChatBot() {
    const [qnaData, setQnaData] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [userMessage, setUserMessage] = useState('');
    const navigate = useNavigate();
    const isAdmin = sessionStorage.getItem("role") === "ADMIN";
    const memNum = sessionStorage.getItem("memNum");


    useEffect(() => {
        // 서버에서 Q&A 데이터를 가져오는 함수
        const fetchQnaData = () => {
            fetch(SERVER_URL + "cbot")
                .then(response =>
                    response.json())
                .then(data =>
                    setQnaData(data))
                .catch(err => console.error(err));
        };

        fetchQnaData();
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setSelectedTitle(null); // 카테고리를 선택하면 선택한 타이틀 초기화
        const newChatHistory = [...chatHistory, { text: category, isUser: true }];
        setChatHistory(newChatHistory);
    };

    const handleTitleClick = (title, content) => {
        setSelectedTitle(title);
        const newChatHistory = [
            ...chatHistory,
            { text: title, isUser: true },
        ];

        if (content) {
            newChatHistory.push({ text: content, isUser: false });
        }

        setChatHistory(newChatHistory);
    };

    const handleGoBack = () => {
        // '뒤로 가기' 버튼 클릭 시 선택한 카테고리와 타이틀 초기화
        setSelectedCategory(null);
        setSelectedTitle(null);
    };

    const handleGoRealTime = () => {
        if (memNum === null) {
            alert('로그인 후 사용 가능합니다.');
        } else {
            navigate(`/chat/${memNum}`);
        }
    }

    const handleUserMessageSubmit = () => {
        if (userMessage.trim() === '') return;

        const newChatHistory = [
            ...chatHistory,
            { text: userMessage, isUser: true },
        ];

        setUserMessage('');
        setChatHistory(newChatHistory);
    };

    return (
        <div className={styles.chatbotContainer}>
            <div className={styles.chatHistory}>
                {chatHistory.map((message, index) => (
                    <div
                        key={index}
                        className={`${styles.message} ${
                            message.isUser ? styles.user : styles.bot
                        }`}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <div className={styles.qnaList}>
                {selectedCategory
                    ? qnaData
                        .filter((item) => item.resCtgr === selectedCategory)
                        .map((qna) => (
                            <div
                                key={qna.cbotResNum}
                                onClick={() =>
                                    handleTitleClick(qna.resTitle, qna.resContnet)
                                }
                                className={styles.qnaItem}
                            >
                                {qna.resTitle}
                            </div>
                        ))
                    : qnaData
                        .reduce((categories, qna) => {
                            if (!categories.includes(qna.resCtgr)) {
                                categories.push(qna.resCtgr);
                            }
                            return categories;
                        }, [])
                        .map((category) => (
                            <div
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                                className={styles.qnaItem}
                            >
                                {category}
                            </div>
                        ))}
                <div
                    onClick={handleGoRealTime}
                    className={`${styles.qnaItem}`}
                >
                    실시간 채팅 전환
                </div>
                {selectedCategory && (
                    <div
                        onClick={handleGoBack}
                        className={`${styles.qnaItem}`}
                    >
                        뒤로 가기
                    </div>

                )}


            </div>
            <div className={styles.userInput}>
                <input
                    type="text"
                    placeholder="메시지 입력..."
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                />
                <button onClick={handleUserMessageSubmit}>보내기</button>
            </div>
        </div>
    );
}

export default ChatBot;
