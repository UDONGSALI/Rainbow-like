import {Route, Routes} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import React from "react";
import LoginPage from "./components/Login";
import Admin from "./pages/Admin";

function App() {

  return (
      <div className="App">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<LoginPage />} />
          </Routes>
      </div>
  );
}

export default App;
