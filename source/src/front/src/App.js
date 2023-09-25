import {Route, Routes, useNavigate} from "react-router-dom";
import './App.css';
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
import SjNewsPage from "./js/pages/Post/SjNewsPage";
import PostList from "./js/component/Post/PostList";
import RentPage from "./js/pages/Rent/RentPage";
import RentStatusPage from "./js/pages/Rent/RentStatusPage";
import RentApplicationPage from "./js/pages/Rent/RentApplicationPage";
import FTMainPage from "./js/pages/FT/FTMainPage";
import FTWListPage from "./js/pages/FT/FTW/FTWListPage";
import FTWFormPage from "./js/pages/FT/FTW/FTWFormPage";
import FTWDtlPage from "./js/pages/FT/FTW/FTWDtlPage";
import FTWEditPage from "./js/pages/FT/FTW/FTWEditPage";
import FTCListPage from "./js/pages/FT/FTC/FTCListPage";
import FTCFormPage from "./js/pages/FT/FTC/FTCFormPage";
import FTCDtlPage from "./js/pages/FT/FTC/FTCDtlPage";
import FTCEditPage from "./js/pages/FT/FTC/FTCEditPage";
import FTMListPage from "./js/pages/FT/FTM/FTMListPage";
import MatchingPopup from "./js/component/FT/FTM/MatchingPopup";
import ClubPage from "./js/pages/Club/ClubPage";
import ClubFormPage from "./js/pages/Club/ClubFormPage";
import ClubDtlPage from "./js/pages/Club/ClubDtlPage";
import ClubEditorPage from "./js/pages/Club/ClubEditorPage";


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
            <NavBar/>
            <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="/admin/member" element={isAdmin ? <MemManagePage/> : null}/>
                <Route path="/admin/edu" element={isAdmin ? <EduListPage/> : null}/>
                <Route path="/admin/edu/add" element={isAdmin ? <EduAddPage/> : null}/>
                <Route path="/admin/edu/edit/:eduNum" element={isAdmin ? <EduEditPage/> : null}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/singUp" element={<SingUp/>}/>
                <Route path="/edu/list" element={<EduListPage/>}/>
                <Route path="/edu/calendar" element={<EduCalendarPage/>}/>
                <Route path="/edu/detail/:eduNum" element={<EduDetailPage/>}/>
                <Route path="/edu/apply/:eduNum" element={<EduApplyPage/>}/>
                <Route path="/sj" element={<SjNewsPage/>}/>
                <Route path="/rent" element={<RentPage/>}/>
                <Route path="/rent/rentStatus" element={<RentStatusPage/>}/>
                <Route path="/rent/rentApplication/:spaceNum" element={<RentApplicationPage/>}/>
                <Route path="/posts" element={<PostList />}   />
                <Route path="/edu/apply/:eduNum" element={<EduApplyPage/>}/>
                <Route path="/sj" element={<SjNewsPage/>}/>
                <Route path="/clubs" element={<ClubPage />}/>
                <Route path="/clubs/new" element={<ClubFormPage />}/>
                <Route path="/clubs/:id" element={<ClubDtlPage />}/>
                <Route path="/clubs/edit/:id" element={<ClubEditorPage />}/>
                <Route path="/ftmain" element={<FTMainPage />} />
                <Route path="/ftw" element={<FTWListPage />} />
                <Route path="/ftw/new" element={<FTWFormPage />} />
                <Route path="/ftw/:id" element={<FTWDtlPage />} />
                <Route path="/ftw/edit/:id" element={<FTWEditPage/>}/>
                <Route path="/ftc" element={<FTCListPage/>}/>
                <Route path="/ftc/new" element={<FTCFormPage/>}/>
                <Route path="/ftc/:id" element={<FTCDtlPage />} />
                <Route path="/ftc/edit/:id" element={<FTCEditPage/>}/>
                <Route path="/ftm" element={<FTMListPage/>}/>
                <Route path="/ftmpop/:speField/:ftcNum" element={<MatchingPopup />}/>
            </Routes>
        </div>
    )
}

export default App;