<<<<<<< HEAD

import './App.css';
import './layout/css/font.css';
import Footer from "./footer/footer";
 import Container_common from "./mypage/container_common";
import Header from "./Header/header";
import Mypage_active from "./mypage/mypage_active";
import Mypage from "./mypage/mypage";
=======
import {Route, Routes} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import React from "react";
import LoginPage from "./pages/Login";
import Admin from "./pages/Admin";
>>>>>>> 88d2d4886d3552068a9986ea1eafdfda596bc17d

function App() {

  return (
<<<<<<< HEAD
    <div className="App">
        {/*<Header/>*/}
        <Container_common/>
        <Mypage_active/>
        {/*<Footer/>*/}
    </div>
=======
      <div className="App">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<LoginPage />} />
          </Routes>
      </div>
>>>>>>> 88d2d4886d3552068a9986ea1eafdfda596bc17d
  );
}

export default App;
