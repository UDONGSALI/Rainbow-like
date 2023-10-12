import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import './App.css';
import LoginPage from "./js/pages/Login/LoginPage";
import React, {useEffect, useState} from "react";
import MemManagePage from "./js/pages/Member/MemManagePage";
import EduCalendarPage from "./js/pages/Edu/EduCalendarPage";
import EduListPage from "./js/pages/Edu/EduListPage";
import EduDetailPage from "./js/pages/Edu/EduDetailPage";
import EduAddPage from "./js/pages/Edu/EduAddPage";
import EduEditPage from "./js/pages/Edu/EduEditPage";
import EduApplyPage from "./js/pages/Edu/EduApplyPage";
import PostDetailPage from './js/pages/Post/PostDetailPage';
import NoticeListPage from './js/pages/Post/NoticeListPage';
import Main from "./js/component/screens/Main";
import SjNewsPage from "./js/pages/Post/SjNewsPage";
import PostList from "./js/component/Post/PostList";
import RentProcessPage from "./js/pages/Rent/RentProcessPage";
import RentStatusPage from "./js/pages/Rent/RentStatusPage";
import RentApplyPage from "./js/pages/Rent/RentApplyPage";
import FTMainPage from "./js/pages/FT/FTMainPage";
import FTWListPage from "./js/pages/FT/FTW/FTWListPage";
import FTWFormPage from "./js/pages/FT/FTW/FTWFormPage";
import FTWDtlPage from "./js/pages/FT/FTW/FTWDtlPage";
import FTWEditPage from "./js/pages/FT/FTW/FTWEditPage";
import FTCListPage from "./js/pages/FT/FTC/FTCListPage";
import FTCFormPage from "./js/pages/FT/FTC/FTCFormPage";
import FTCDtlPage from "./js/pages/FT/FTC/FTCDtlPage";
import FTCEditPage from "./js/pages/FT/FTC/FTCEditPage";
import MatchingPopup from "./js/component/FT/FTM/MatchingPopup";
import ClubPage from "./js/pages/Club/ClubPage";
import ClubFormPage from "./js/pages/Club/ClubFormPage";
import SignUpPage from "./js/pages/Login/SignUpPage";
import ClubDtlPage from "./js/pages/Club/ClubDtlPage";
import ClubEditorPage from "./js/pages/Club/ClubEditorPage";
import EduHistListPage from "./js/pages/Edu/EduHistListPage";
import LaborListPage from "./js/pages/Post/LaborListPage";
import ErrorPage from "./js/pages/ErrorPage";
import BoardPostListPage from "./js/pages/Board/BoardPostListPage";
import BoardListPage from "./js/pages/Board/BoardListPage";
import OrgListPage from "./js/pages/Organization/OrgListPage";
import {useTracking} from "./js/component/hook/useTracking";
import {useToken} from "./js/component/hook/useToken";
import LogListPage from "./js/pages/Log/LogListPage";
import RentHistListPage from "./js/pages/Rent/RentHistListPage";
import MyActivePage from "./js/pages/My/MyActivePage";
import MyRentPage from "./js/pages/My/MyRentPage";
import MyFTWPage from "./js/pages/My/MyFTWPage";
import MyClubPage from "./js/pages/My/MyClubPage";
import MyCounselPage from "./js/pages/My/MyCounselPage";
import RentReviewPostPage from "./js/pages/Rent/RentReviewPostPage";
import Pay from "./js/component/Pay/pay";
import SMSPage from "./js/pages/SMS/SMSPage";
import PayListPage from "./js/pages/Pay/PayListPage";
import ChatPage from "./js/pages/Chat/ChatPage";
import Chating from "./js/component/Chat/Chatting";
import CustomNavbar from "./js/layout/Navbar/CustomNavbar";
import PostForm from "./js/component/Post/PostForm";



function App() {
    const decodeToken = useToken();
    const isAdmin = sessionStorage.getItem("role") === "ADMIN";
    const [memId, setMemId] = useState(sessionStorage.getItem('memId'));
    const {trackButtonClick, trackPageView} = useTracking(memId);
    const location = useLocation();
    const isPaymentRoute = location.pathname.includes("/pay/"); // /pay/로 시작하는 경로인지 확인
    const isChatRoute = location.pathname.includes("/chat");

    useEffect(() => {
        setMemId(sessionStorage.getItem("memId"));
    }, []);

    useEffect(() => {
        trackPageView();
    }, [trackPageView]);


    return (
        <div className="App" onClick={trackButtonClick}>

            {!isPaymentRoute && !isChatRoute &&  <CustomNavbar memId={memId} isAdmin={isAdmin}/>}
            <Routes>
                <Route path="/" element={<Main/>}/>


                {/*로그인*/}
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/signUp" element={<SignUpPage/>}/>

                {/*관리자*/}
                <Route path="/admin/member" element={isAdmin ? <MemManagePage/> : null}/>
                <Route path="/admin/edu" element={isAdmin ? <EduListPage type="admin"/> : null}/>
                <Route path="/admin/edu/add" element={isAdmin ? <EduAddPage/> : null}/>
                <Route path="/admin/edu/edit/:eduNum" element={isAdmin ? <EduEditPage/> : null}/>
                <Route path="/admin/eduHist" element={isAdmin ? <EduHistListPage memId={memId} type="admin"/> : null}/>
                <Route path="/admin/rentHist" element={isAdmin ? <RentHistListPage memId={memId} type="admin"/> : null}/>
                <Route path="/admin/org" element={isAdmin ? <OrgListPage/> : null}/>
                <Route path="/admin/board" element={isAdmin ? <BoardListPage/> : null}/>
                <Route path="/admin/board/post/:boardNum" element={isAdmin ? <BoardPostListPage/> : null}/>
                <Route path="/admin/log" element={isAdmin ? <LogListPage/> : null}/>
                <Route path="/admin/pay" element={isAdmin ? <PayListPage/> : null}/>
                <Route path="admin/ftmain" element={<FTMainPage  type="admin" />} />
                <Route path="admin/ftmain/ftw/:id" element={<FTWDtlPage type="admin" />} />


                {/*교육*/}
                <Route path="/edu/calendar" element={<EduCalendarPage/>}/>
                <Route path="/edu/list" element={<EduListPage/>}/>
                <Route path="/edu/list/detail/:eduNum" element={<EduDetailPage/>}/>
                <Route path="/edu/list/apply/:eduNum" element={memId ? <EduApplyPage/> : <Navigate to="/login" replace/>}/>
                <Route path="/edu/applylist" element={memId ? <EduHistListPage memId={memId} type="edu"/> : <Navigate to="/login" replace/>}/>

                {/*결제*/}
                <Route path="/pay/:rentHistNum/:fee" element={<Pay/>}/>

                {/*게시글*/}
                <Route path="/sj" element={<SjNewsPage/>}/>
                <Route path="/posts" element={<PostList/>}/>
                <Route path="/post/detail/:boardNum/:postNum" element={<PostDetailPage/>}/>
                <Route path="/imgPost/:boardNum" element={<SjNewsPage/>}/>
                <Route path="/post/:boardNum" element={<NoticeListPage/>}/>
                <Route path="/csl/:boardNum" element={<LaborListPage/>}/>
                <Route path="/error" element={<ErrorPage/>}/>
                <Route path="/post/new" element={<PostForm/>}/>

                {/*공간대관페이지관련*/}
                <Route path="/rent/process" element={<RentProcessPage/>}/>
                <Route path="/rent/status" element={<RentStatusPage/>}/>
                <Route path="/rent/apply" element={<RentApplyPage/>}/>
                <Route path="/rent/review" element={<RentReviewPostPage/>}/>

                {/*마이페이지관련*/}
                <Route path="/mypage/edu" element={memId ? <EduHistListPage memId={memId}/> : <Navigate to="/login" replace/>}/>
                <Route path="/mypage/rent" element={<MyRentPage/>}/>
                <Route path="/mypage/active" element={<MyActivePage/>}/>
                <Route path="/mypage/ftw" element={<MyFTWPage/>}/>
                <Route path="/mypage/club" element={<MyClubPage/>}/>
                <Route path="/mypage/csl" element={<MyCounselPage/>}/>

                {/*소모임*/}
                <Route path="/clubs" element={<ClubPage />}/>
                <Route path="/clubs/new" element={memId? <ClubFormPage /> : <Navigate to ="/login" replace/> }/>
                <Route path="/clubs/:id" element={<ClubDtlPage />}/>
                <Route path="/clubs/edit/:id" element={<ClubEditorPage />}/>

                {/*인재풀*/}
                <Route path="/ftmain" element={<FTMainPage/>} />
                <Route path="/ftw/new" element={memId? <FTWFormPage /> : <Navigate to ="/login" replace/> } />
                <Route path="/ftw/dtl/:id" element={<FTWDtlPage />} />
                <Route path="/ftw/edit/:id" element={<FTWEditPage/>}/>
                <Route path="/ftc/new" element={memId? <FTCFormPage /> : <Navigate to ="/login" replace/> }/>
                <Route path="/ftc/dtl/:id" element={<FTCDtlPage />} />
                <Route path="/ftc/edit/:id" element={<FTCEditPage/>}/>
                <Route path="/admin/ftmain/ftw" element={isAdmin? <FTWListPage /> : null } />
                <Route path="/admin/ftmain/ftc" element={isAdmin? <FTCListPage/> : null}/>
                <Route path="/ftmpop/:ftcNum" element={isAdmin? <MatchingPopup /> : null}/>

                {/*SMS*/}
                <Route path="/sms" element={isAdmin? <SMSPage /> : null}/>
                {/*<Route path="/sms" element={<SMSPage />}  />*/}

                {/*챗봇 / 채팅*/}
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/chat/:memNum" element={<Chating />} />

            </Routes>
        </div>
    )
}

export default App;