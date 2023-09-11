import {Route, Routes} from "react-router-dom";
import './App.css';
import LoginPage from "./pages/LoginPage";
import React from "react";
import AdminPage from "./pages/AdminPage";
import SingUp from "./components/SingUp";

function App() {

  return (
      <div className="App">
          <Routes>
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/singUp" element={<SingUp />} />
          </Routes>
      </div>
  );
}

export default App;
