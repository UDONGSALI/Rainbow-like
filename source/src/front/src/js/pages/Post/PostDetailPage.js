import React, { useEffect,useState } from 'react';
import PostDetail from "../../component/Post/PostDetail";
import { useParams, useNavigate } from 'react-router-dom';
import Footer from "../../layout/Footer/footer";
import { SERVER_URL } from '../../component/Common/constants'

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


    let pageTitle;
    switch (boardNum) {
        case '1':
            pageTitle = '공지사항';
            break;
        case '2':
            pageTitle = '언론보도';
            break;
        case '3':
            pageTitle = '세종시 기관 및 단체 소식';
            break;
        case '4':
            pageTitle = '여플소식';
            break;
        case '5':
            pageTitle = '뉴스레터';
            break;
        case '7':
            pageTitle = '노무상담게시판';
            break;
        case '8':
            pageTitle = '온라인상담';
            break;
        default:
            pageTitle = '알 수 없는 게시판'; // 또는 적절한 오류 메시지
            break;
    }

    return (
        <div>
            <h2 style={{ textAlign: 'center',marginTop:'20px' ,marginBottom:'20px'}}>{pageTitle}</h2>
            {showPost ? <PostDetail postNum={ postNum } boardNum = {boardNum} /> : null}
            <Footer />
        </div>
    );
}

export default PostDetailPage;