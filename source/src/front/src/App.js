import './App.css';
import './css/font.css';
import React from "react";
import {Route, Routes} from "react-router";
import AdminPage from "./js/pages/AdminPage";
import LoginPage from "./js/pages/LoginPage";
import SingUp from "./js/component/SingUp";
import RentStatusPage from "./js/pages/RentStatusPage";
import RentPage from "./js/pages/RentPage";

import EduCalendarPage from "./js/pages/EduCalendarPage";
import RentApplication from "./js/pages/RentApplicationPage";



function App() {

    return (
        <div className="App">

            <Routes>
                <Route path="/admin" element={<AdminPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/singUp" element={<SingUp/>}/>
                <Route path="/rent" element={<RentPage/>}/>
                <Route path="/rentStatus" element={<RentStatusPage/>}/>
                <Route path="/rentApplication" element={<RentApplication/>}/>
                <Route path="/eduCalendar" element={<EduCalendarPage/>}/>
            </Routes>

        </div>
    );
}

export default App;
