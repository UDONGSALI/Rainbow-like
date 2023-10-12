import {useNavigate, useParams} from "react-router-dom";
import styles from "../../../css/component/Chat/Chat.module.css"
import React, {useEffect, useRef, useState} from "react";
import {SERVER_URL} from "../Common/constants";

function Chatting({param}){
    const [chatData, setChatData] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [userMessage, setUserMessage] = useState('');
    const navigate = useNavigate();
    const isAdmin = sessionStorage.getItem("role") === "ADMIN";
    const {memNum} = useParams();
    const isMemNum = sessionStorage.getItem("memNum");
    const memId = sessionStorage.getItem("memId");
    const scrollContainerRef = useRef(null);



    useEffect(() => {
        fetchChatData();
    }, []);

    const fetchChatData = () => {
        fetch(SERVER_URL + "findchatbyroom/" + memNum)
            .then(response =>
                response.json())
            .then(data =>{
                setChatData(data);
            })
            .catch(err => console.error(err));
    };



    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    useEffect(() => {
        const newChatHistory = [...chatHistory, { text: `반갑습니다, ${memId}님! 무엇이 궁금하신가요?`, isUser: false }];
        setChatHistory(newChatHistory);

    }, []);

    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    };

    const handleUserMessageSubmit = () => {
        if (userMessage.trim() === '') return;

        const newChatHistory = [
            ...chatHistory,
            { text: userMessage, isUser: true },
        ];

        setUserMessage('');
        setChatHistory(newChatHistory);

    };

    const handleOnKeyPress = e => {
        if (e.key === 'Enter') {
            handleUserMessageSubmit();
        }
    };


    if(memNum === isMemNum || isAdmin){
        return (
            <div className={styles.chatbotContainer}>
                <div className={styles.chatHistory}
                     ref={scrollContainerRef}
                     style={{
                         overflowY: 'auto',
                         height: '600px' // 스크롤이 필요한 높이로 설정
                     }}>
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

                <div className={styles.userInput}>
                    <input
                        type="text"
                        placeholder="메시지 입력..."
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        onKeyDown={handleOnKeyPress}
                    />
                    <button onClick={handleUserMessageSubmit}>보내기</button>
                </div>
            </div>
        );
    }
        return(<div><h1>잘못된 접근입니다.</h1></div>)



}


export default Chatting;