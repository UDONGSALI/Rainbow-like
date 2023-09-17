import {Route, Routes, useNavigate} from "react-router-dom";
import './App.css';
import './css/font.css';
import LoginPage from "./js/pages/LoginPage";
import React, {useEffect} from "react";
import AdminPage from "./js/pages/AdminPage";
import NavBarElements from './js/layout/NavBarElements';
import EduListPage from "./js/pages/EduListPage";
import EduDetailPage from "./js/pages/EduDetailPage";
import EduCalendarPage from "./js/pages/EduCalendarPage";
import SingUp from "./js/component/SingUp";

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
            <NavBarElements/>
            <Routes>
                <Route path="/admin" element={isAdmin ? <AdminPage/> : null}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/singUp" element={<SingUp/>}/>
                <Route path="/edu/list" element={<EduListPage/>}/>
                <Route path="/edu/detail/:eduNum" element={<EduDetailPage/>}/>
                <Route path="/edu/calendar" element={<EduCalendarPage/>}/>
            </Routes>
        </div>
    )
}

export default App;