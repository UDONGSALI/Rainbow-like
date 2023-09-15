import './App.css';
import './css/font.css';
import React from "react";
import {Route, Routes} from "react-router";
import AdminPage from "./js/pages/AdminPage";
import LoginPage from "./js/pages/LoginPage";
import SingUp from "./js/component/SingUp";
import RentProcess from "./js/component/rent/RentProcess";

function App() {

    return (
        <div className="App">

            <Routes>
                <Route path="/admin" element={<AdminPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/singUp" element={<SingUp/>}/>
                <Route path="/rentProcess" element={<RentProcess/>}/>
            </Routes>

        </div>


    );
}

export default App;
