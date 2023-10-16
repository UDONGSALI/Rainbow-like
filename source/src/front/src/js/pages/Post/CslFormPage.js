import PostForm from "../../component/Post/PostForm";
import useFetch from "../../component/hook/useFetch";
import {SERVER_URL} from "../../component/Common/constants";
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/CslHeader";
import { useLocation } from "react-router-dom";
import React from "react";
import Footer from "../../layout/Footer/footer";

function CslFormPage() {
    const location = useLocation();
    const { boardNum } = location.state || {};
    const { data: postNum, loading } = useFetch(`${SERVER_URL}post/lastPostNum`);
    let footerTitle = "";

    if (boardNum == "7") {
        footerTitle = "노무상담게시판";
    } else if (boardNum == "8") {
        footerTitle = "온라인상담";
    }

    // 로딩 중일 때는 "Loading..." 메시지를 표시
    if (loading || !postNum) {
        return <div>Loading...</div>;
    }

    // 로딩이 끝나면 PostForm 컴포넌트를 렌더링
    return (
        <div>
        <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={footerTitle}/>
        <PostForm postNum={postNum} />
        <Footer/>
        </div>
    );
}

export default CslFormPage;