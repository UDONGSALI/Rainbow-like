import './App.css';
import './layout/css/font.css';
import Footer from "./mypage/footer";
import Header from "./Header/header";
import './App.css';
import LoginPage from "./pages/LoginPage";
import React from "react";
import AdminPage from "./pages/AdminPage";
import SingUp from "./components/SingUp";
import Top from "./mypage/top";
import Mypage from "./mypage/mypage";
import {Route, Router, Routes} from "react-router";

function App() {

    return (
        <div className="App">

                <Routes>
                    <Route path="/admin" element={<AdminPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/singUp" element={<SingUp/>}/>
                </Routes>

            {/*<Header/>*/}
            {/*<Mypage/>*/}

        </div>


    );
}

export default App;
