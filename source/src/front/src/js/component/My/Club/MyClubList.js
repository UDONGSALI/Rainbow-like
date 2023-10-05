import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {SERVER_URL} from "../../Common/constants";

export default function MyClubList() {
    // const [memNum, setMemNum] = useState(null); // 멤버 ID 상태
    // const [clubs, setClubs] = useState([]); // 게시글 데이터 상태
    // const navigate = useNavigate();
    //
    //
    // useEffect(() => {
    //     // memNum 상태가 변경될 때마다 fetchPostsByMember를 호출
    //     if (memNum !== null) {
    //         fetchClubsByMember();
    //     }
    // }, [memNum]);
    //
    //
    // const fetchClubsByMember = () => {
    //     if (memNum === null) {
    //         return;
    //     }
    //
    //     fetch(`${SERVER_URL}/clubs/${postId}`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //             const memberClubs = data.filter((post) => post.member.memNum === memNum);
    //             setClubs(memberClubs);
    //             const clubsWithNumbers = data.map((post, index) => ({
    //                 ...post,
    //                 id: post.postNum,
    //                 number: data.length - index, // 각 행에 번호를 순차적으로 할당
    //             }));
    //             setClubs(clubsWithNumbers);
    //
    //         })
    //         .catch((error) => {
    //             console.error("API 호출 중 오류 발생:", error);
    //         });
    // };

    return (
        <div>

        </div>
    )


};

