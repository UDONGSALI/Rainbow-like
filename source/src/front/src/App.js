import {Route, Routes, useNavigate} from "react-router-dom";
import './App.css';
import './css/font.css';
import LoginPage from "./js/pages/Login/LoginPage";
import React, {useEffect} from "react";
import NoticeDetailPage from "./js/pages/NoticeDetailPage";
import NoticePage from "./js/pages/NoticePage";
import MemManagePage from "./js/pages/Member/MemManagePage";
import SingUp from "./js/component/Login/SignUp";
import PostList from "./js/component/Post/PostList";
import ClubList from "./js/component/Club/ClubList";
import ClubForm from "./js/component/Club/ClubForm";
import ClubEditor from "./js/component/Club/ClubEditor";
import ClubDtlPage from "./js/pages/Club/ClubDtlPage";
import EduCalendarPage from "./js/pages/Edu/EduCalendarPage";
import EduListPage from "./js/pages/Edu/EduListPage";
import EduDetailPage from "./js/pages/Edu/EduDetailPage";
import EduManagePage from "./js/pages/Edu/EduManagePage";
import EduAddPage from "./js/pages/Edu/EduAddPage";
import EduEditPage from "./js/pages/Edu/EduEditPage";
import RentPage from "./js/pages/Rent/RentPage";
import RentStatusPage from "./js/pages/Rent/RentStatusPage";
import RentApplicationPage from "./js/pages/Rent/RentApplicationPage";

function App() {
    const isAdmin = sessionStorage.getItem("role") === "ADMIN"; // 사용자가 ADMIN인지 확인
    const navigate = useNavigate();

    useEffect(() => {
        // sessionStorage에서 JWT 토큰을 가져옵니다.
        const token = sessionStorage.getItem('jwt');

        if (token) {
            // JWT 디코딩 라이브러리를 사용하여 토큰을 디코딩합니다.
            const decodedToken = decodeToken(token);
            // 유형을 세션 스토리지에 저장
            sessionStorage.setItem("role", decodedToken.role);
            // username을 세션 스토리지에 저장
            sessionStorage.setItem("memId", decodedToken.sub);

        }
    }, [navigate]);

    // JWT 토큰을 디코딩하는 함수
    function decodeToken(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            return null;
        }
    }

    return (
        <div className="App">
            <Routes>
                <Route path="/admin/member" element={isAdmin ? <MemManagePage/> : null}/>
                <Route path="/admin/edu" element={isAdmin ? <EduManagePage/> : null}/>
                <Route path="/admin/edu/add" element={isAdmin ? <EduAddPage/> : null}/>
                <Route path="/admin/edu/edit/:eduNum" element={isAdmin ? <EduEditPage/> : null}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/singUp" element={<SingUp/>}/>
                <Route path="/edu/list" element={<EduListPage/>}/>
                <Route path="/edu/calendar" element={<EduCalendarPage/>}/>
                <Route path="/edu/detail/:eduNum" element={<EduDetailPage/>}/>
                <Route path="/notice/detail/:postNum" element={<NoticeDetailPage/>}/>
                <Route path="/notice/:boardNum" element={<NoticePage/>}/>
                <Route path="/posts" element={<PostList/>}/>
                <Route path="/clubs" element={<ClubList/>}/>
                <Route path="/clubs/new" element={<ClubForm/>}/>
                <Route path="/rent" element={<RentPage/>}/>
                <Route path="/rent/rentStatus" element={<RentStatusPage/>}/>
                <Route path="/rent/rentApplication/:spaceNum" element={<RentApplicationPage/>}/>
                <Route
                    path="/posts/:id" element={<ClubDtlPage/>}
                    render={(props) => <ClubDtlPage {...props} />} // props를 전달
                />
                <Route
                    path="/posts/edit/:id" element={<ClubEditor/>}
                    render={(props) => <ClubDtlPage {...props} />} // props를 전달
                />
            </Routes>
        </div>
    )
}

export default App;