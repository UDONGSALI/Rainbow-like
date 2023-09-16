<<<<<<<< HEAD:source/src/front/src/js/components/mypage/mypage_active.js
========
import '../../../css/component/mypage_active.css' ;
>>>>>>>> e1c2fa4cefa80d3884e1c2dab03cd89e0b65e8c4:source/src/front/src/js/compnent/mypage/mypage_active.js

const Mypage_active = () => {
    return(
        <div id="content_wrap">
            <div className="layout">
                <header id="sub_tit">
                    <h3>활동 내역</h3>
                </header>
                <ariticle id="txt">
                    <h4>내가 쓴 게시글 관리
                        <a href="https://sj-equity.or.kr/sub0609" className="target_page">
                            <span>회원정보수정</span>
                        </a>
                    </h4>
                    <div id="content" className="post_list">
                        <div className="board_list">
                            <div className="tb1_scroll">
                                <div className="tb1_wrap">
                                    <table className="tb1_board">
                                        <caption>번호, 구분, 제목, 상태, 작성일, 조회수</caption>
                                        <colgroup>
                                            <col style={{width:'100px'}}/>
                                            <col style={{width:'100px'}}/>
                                            <col style={{width:'300px'}}/>
                                            <col style={{width:'100px'}}/>
                                            <col style={{width:'100px'}}/>
                                        </colgroup>
                                        <thead>
                                        <tr>
                                            <th>번호</th>
                                            <th>구분</th>
                                            <th>제목</th>
                                            <th>상태</th>
                                            <th>작성일</th>
                                            <th>조회수</th>
                                        </tr>
                                        </thead>
                                        <tbody> </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="board_pager" > </div>
                        </div>
                    </div>
                </ariticle>

            </div>
        </div>
    );
}

export default Mypage_active;