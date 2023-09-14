import './App.css';
import './layout/css/font.css';
import Footer from "./footer/footer";
 import Container_common from "./mypage/container_common";
import Header from "./Header/header";
import Mypage_active from "./mypage/mypage_active";
import Mypage from "./mypage/mypage";
import './App.css';
import LoginPage from "./pages/LoginPage";
import React from "react";
import AdminPage from "./pages/AdminPage";
import SingUp from "./js/component/SingUp";
import React from "react";

function App() {

  return (
      <div className="App">
          <Routes>
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/singUp" element={<SingUp />} />
          </Routes>
          {/*<Header/>*/}
          <Container_common/>
          <Mypage_active/>
          <Footer/>

      </div>



  );
}

export default App;
