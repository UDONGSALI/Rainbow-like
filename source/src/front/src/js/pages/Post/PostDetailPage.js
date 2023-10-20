import React, { useEffect,useState } from 'react';
import PostDetail from "../../component/Post/PostDetail";
import { useParams, useNavigate } from 'react-router-dom';
import Footer from "../../layout/Footer/footer";
import { SERVER_URL } from '../../component/Common/constants'
import Header from "../../layout/Header/Header";
import {headerInfo, urlData} from "../../layout/Header/Data/InfoShareHeader";

function PostDetailPage() {
    const navigate = useNavigate();
    const { boardNum, postNum } = useParams();
    const isAdmin = sessionStorage.getItem("role") === "ADMIN";
    const isLabor = sessionStorage.getItem("role") === "LABOR";
    const isCounselor= sessionStorage.getItem("role") === "COUNSELOR";
    const memNum = sessionStorage.getItem("memNum");

    // 게시글을 표시할지 여부를 저장하는 상태
    const [showPost, setShowPost] = useState(false);

    //7,8번 게시판 상세 글 접근 권한 설정
    useEffect(() => {
        fetch(`${SERVER_URL}post/${postNum}`)
            .then(response => response.json())
            .then(data => {
                const { board, parentsNum } = data;
                if (board.boardNum == 7 || board.boardNum == 8) {
                    const fetchParentDataIfNeeded = () => {
                        if (parentsNum) {
                            return fetch(`${SERVER_URL}post/${parentsNum}`)
                                .then(response => response.json());
                        }
                        return Promise.resolve(null);
                    };

                    fetchParentDataIfNeeded().then(parentData => {

                        const isAllowed = () => {
                            if (board.boardNum == 8) {
                                return isAdmin || isCounselor;
                            }
                            if (board.boardNum == 7) {
                                return isAdmin ||
                                    memNum == data.labor?.memNum ||
                                    memNum == data.member?.memNum ||
                                    memNum == parentData?.member?.memNum;
                            }
                            return false;
                        };

                        if (!isAllowed()) {
                            alert("이 페이지에 접근할 수 없습니다.");
                            navigate('/error');
                            return;
                        }
                        setShowPost(true);
                    });
                } else {
                    setShowPost(true);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, [postNum, navigate, isAdmin, isLabor, isCounselor, memNum]);


    let footerTitle = "";

    if (boardNum == "1") {
        footerTitle = "공지사항";
    } else if (boardNum == "2") {
        footerTitle = "언론보도";
    }else if (boardNum == "3") {
        footerTitle = "세종시 기관 및 단체 소식";
    }else if (boardNum == "4") {
        footerTitle = "여플소식";
    }else if (boardNum == "5") {
        footerTitle = "뉴스레터";
    }else if (boardNum == "7") {
        footerTitle = "노무상담 게시판";
    }else if (boardNum == "8") {
        footerTitle = "온라인상담 게시판";
    }

    return (
        <div>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={footerTitle}/>
            {showPost ? <PostDetail postNum={ postNum } boardNum = {boardNum} /> : null}
            <Footer />
        </div>
    );
}

export default PostDetailPage;