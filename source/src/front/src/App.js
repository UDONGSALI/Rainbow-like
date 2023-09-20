import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import './App.css';
import './css/font.css';
import LoginPage from "./js/pages/Login/LoginPage";
import React, {useEffect} from "react";
import MemManagePage from "./js/pages/Member/MemManagePage";
import NavBar from './js/layout/Navbar/NavBar';
import SingUp from "./js/component/Login/SignUp";
import EduCalendarPage from "./js/pages/Edu/EduCalendarPage";
import EduListPage from "./js/pages/Edu/EduListPage";
import EduDetailPage from "./js/pages/Edu/EduDetailPage";
import EduAddPage from "./js/pages/Edu/EduAddPage";
import EduEditPage from "./js/pages/Edu/EduEditPage";
import EduApplyPage from "./js/pages/Edu/EduApplyPage";
import Main from "./js/component/screens/Main";
import PostList from "./js/component/Post/PostList";
import ClubList from "./js/component/Club/ClubList";
import ClubForm from "./js/component/Club/ClubForm";
import ClubDtlPage from "./js/pages/Club/ClubDtlPage";
import ClubEditor from "./js/component/Club/ClubEditor";
import EduApplyCheckPage from "./js/pages/Edu/EduApplyCheckPage";
import NoticePage from "./js/pages/Post/NoticePage";
import NoticeDetailPage from "./js/pages/Post/NoticeDetailPage";

function App() {
    const isAdmin = sessionStorage.getItem("role") === "ADMIN"; // 사용자가 ADMIN인지 확인
    const memId =  sessionStorage.getItem("memId");
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
            {/*<NavBarElements/>*/}
            <NavBar/>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/singUp" element={<SingUp/>}/>
                <Route path="/admin/member" element={isAdmin ? <MemManagePage/> : null}/>
                <Route path="/edu/list" element={<EduListPage/>}/>
                <Route path="/edu/detail/:eduNum" element={<EduDetailPage/>}/>
                <Route path="/edu/apply/:eduNum" element={<EduApplyPage memId = {memId} />}/>
                <Route path="/edu/calendar" element={<EduCalendarPage/>}/>
                <Route path="/edu/applyCheck" element={<EduApplyCheckPage memId = {memId} />}/>
                <Route path="/admin/edu/apply" element={isAdmin ? <EduApplyCheckPage memId = {memId}/> : null}/>
                <Route path="/admin/edu/apply" element={<EduApplyCheckPage memId = {memId}/> }/>
                <Route path="/admin/edu" element={isAdmin ? <EduListPage /> : null}/>
                <Route path="/admin/edu/add" element={isAdmin ? <EduAddPage/> : null}/>
                <Route path="/admin/edu/edit/:eduNum" element={isAdmin ? <EduEditPage/> : null}/>
                <Route path="/posts" element={<PostList />}   />
                <Route path="/clubs" element={<ClubList />}   />
                <Route path="/clubs/new" element={<ClubForm />}   />
                <Route
                    path="/posts/:id" element={<ClubDtlPage />}
                    render={(props) => <ClubDtlPage {...props} />} // props를 전달
                />
                <Route
                    path="/posts/edit/:id" element={<ClubEditor />}
                    render={(props) => <ClubDtlPage {...props} />} // props를 전달
                />
                <Route path="/edu/apply/:eduNum" element={<EduApplyPage/>}/>
                <Route path="/notice/detail/:postNum" element={<NoticeDetailPage/>}/>
                <Route path="/notice/:boardNum" element={<NoticePage/>}/>
            </Routes>
        </div>
    )
}

export default App;