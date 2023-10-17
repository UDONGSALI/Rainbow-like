import { useNavigate } from 'react-router-dom';

function useDeletePost() {
    const navigate = useNavigate();

    const deletePost = async (postNum, files, boardNum, SERVER_URL) => {
        const isConfirmed = window.confirm("정말로 이 게시글을 삭제하시겠습니까?");
        if (!isConfirmed) {
            return false;
        }

        try {
            const fileDeletePromises = files.length ?
                files.filter(file => file.post.postNum === postNum)
                    .map(file => {
                        const fileDeleteUrl = `${SERVER_URL}files/post/${postNum}`;
                        return fetch(fileDeleteUrl, { method: 'DELETE' });
                    }) : [];

            const fileResponses = await Promise.all(fileDeletePromises);
            if (!fileResponses.length || fileResponses.every(response => response.ok)) {
                const postResponse = await fetch(`${SERVER_URL}post/${postNum}`, { method: 'DELETE' });
                if (postResponse.ok) {
                    let newUrl;
                    if (boardNum <= 2) {
                        newUrl = `/post/${boardNum}`;
                    } else if (boardNum >= 3 && boardNum <= 5) {
                        newUrl = `/imgPost/${boardNum}`;
                    } else if (boardNum >= 7) {
                        newUrl = `/csl/${boardNum}`;
                    } else {
                        // 뒤로 가기
                        navigate(-1);
                    }

                    return true;
                } else {
                    alert("게시글 삭제에 실패하였습니다.");
                    return false;
                }
            } else {
                throw new Error('Failed to delete some files');
            }
        } catch (err) {
            console.error(err);
            alert("오류가 발생했습니다. 다시 시도해주세요.");
            return false;
        }
    };

    return { deletePost };
}

export default useDeletePost;
