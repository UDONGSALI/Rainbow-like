

import './App.css';
import './layout/css/font.css';
import Footer from "./footer/footer";
 import Container_common from "./mypage/container_common";
import Header from "./Header/header";
import Mypage_active from "./mypage/mypage_active";
import Mypage from "./mypage/mypage";
import './App.css';
import React from "react";

function App() {

  return (
    <div className="App">
        {/*<Header/>*/}
        <Container_common/>
        <Mypage_active/>
        <Footer/>
    </div>
  );
}

export default App;
