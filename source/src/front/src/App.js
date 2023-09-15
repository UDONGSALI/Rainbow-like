
import './App.css';
import './css/font.css';
import './App.css';
import LoginPage from "./js/pages/LoginPage";
import React from "react";
import AdminPage from "./js/pages/AdminPage";
import SingUp from "./js/components/SingUp";
import {Route, Routes} from "react-router";
import RentProcess from "./js/components/rent/RentProcess";

function App() {

    return (
        <div className="App">

            {/*<Routes>*/}
            {/*    <Route path="/admin" element={<AdminPage/>}/>*/}
            {/*    <Route path="/login" element={<LoginPage/>}/>*/}
            {/*    <Route path="/singUp" element={<SingUp/>}/>*/}
            {/*</Routes>*/}
            <RentProcess/>
        </div>


    );
}
export default App;
