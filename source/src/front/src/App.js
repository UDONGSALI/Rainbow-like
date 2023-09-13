<<<<<<< HEAD
=======
<<<<<<< HEAD
import {Route, Routes} from "react-router-dom";
>>>>>>> aef92e7 (no message)
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
<<<<<<< HEAD
=======
import LoginPage from "./pages/Login";
import Admin from "./pages/Admin";
=======
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import About from './screens/About';
import Questions from './screens/Questions';
import ReactDoc from './screens/ReactDoc';
import Projects from './screens/Projects';
import NavBarElements from './components/Navbar/NavBarElements';
import { Form } from 'react-bootstrap';


>>>>>>> bc06ba3 (no message)
>>>>>>> aef92e7 (no message)

function App() {

  return (
<<<<<<< HEAD
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
<<<<<<< HEAD



=======
=======
    <div className='App'>
    <NavBarElements />
   <Routes>
   <Route path = "/" element = { <Home /> } />
   <Route path = "/About" element = { <About /> } />
   <Route path = "/Projects" element = { <Projects /> } />
   <Route path = "/Questions" element = { <Questions /> } />
   <Route path = "/ReactDoc" element = { <ReactDoc /> } />
   </Routes>
   </div>
  
>>>>>>> bc06ba3 (no message)
>>>>>>> aef92e7 (no message)
  );
}

export default App;
