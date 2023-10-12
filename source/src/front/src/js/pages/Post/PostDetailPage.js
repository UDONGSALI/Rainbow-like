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
    const memNum = sessionStorage.getItem("memNum");

    // 게시글을 표시할지 여부를 저장하는 상태
    const [showPost, setShowPost] = useState(false);

    //7,8번 게시판 상세 글 접근 권한 설정
    useEffect(() => {
        fetch(`${SERVER_URL}posts/${postNum}`)
            .then(response => response.json())
            .then(data => {
                const parentsNum = data.post.parentsNum;

                if (data.board.boardNum == 7 || data.board.boardNum == 8) {
                    if (parentsNum) {
                        // 부모 게시물이 있을 경우, 부모 게시물 정보를 가져옴
                        fetch(`${SERVER_URL}posts/${parentsNum}`)
                            .then(response => response.json())
                            .then(parentData => {
                                if (!isAdmin &&
                                    memNum != data.post.labor?.memNum &&
                                    memNum != data.post.member.memNum &&
                                    memNum != parentData.member.memNum) {
                                    alert("이 페이지에 접근할 수 없습니다.");
                                    navigate('/error');
                                    return;
                                }
                                // 조건에 부합하면 게시글을 표시
                                setShowPost(true);
                            })
                            .catch(error => {
                                console.error(error);
                                navigate('/error'); // 에러 발생 시 에러 페이지로 리다이렉트
                            });
                    } else {
                        if (!isAdmin && memNum != data.post.labor.memNum && memNum != data.post.member.memNum) {
                            alert("이 페이지에 접근할 수 없습니다.");
                            navigate('/error');
                            return;
                        }
                        // 조건에 부합하면 게시글을 표시
                        setShowPost(true);
                    }
                } else {
                    // 조건에 부합하면 게시글을 표시
                    setShowPost(true);
                }
            })
            .catch(error => {
                console.error(error);
                navigate('/error'); // 에러 발생 시 에러 페이지로 리다이렉트
            });
    }, [postNum, navigate, isAdmin, isLabor, memNum]);

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
