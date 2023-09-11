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
import SingUp from "./components/SingUp";
import React from "react";

function App() {

  return (
<<<<<<< HEAD
      <div className="App">
          <Routes>
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/singUp" element={<SingUp />} />
          </Routes>
      </div>
=======
    <div className="App">
        {/*<Header/>*/}
        <Container_common/>
        <Mypage_active/>
        <Footer/>
    </div>
>>>>>>> 2885b1e61ffec65e6707cb99963a6cf5eee3b6f1
  );
}

export default App;
