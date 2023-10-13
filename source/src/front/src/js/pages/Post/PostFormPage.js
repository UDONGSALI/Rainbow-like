import PostForm from "../../component/Post/PostForm";
import useFetch from "../../component/hook/useFetch";
import {SERVER_URL} from "../../component/Common/constants";

function PostFormPage() {

    const { data: postNum, loading } = useFetch(`${SERVER_URL}post/lastPostNum`);

    // 로딩 중일 때는 "Loading..." 메시지를 표시
    if (loading || !postNum) {
        return <div>Loading...</div>;
    }

    // 로딩이 끝나면 PostForm 컴포넌트를 렌더링
    return <PostForm postNum={postNum} />;
}

export default PostFormPage;