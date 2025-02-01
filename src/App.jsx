import {  lazy } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css'


const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage"));
const SignUpPage = lazy(() =>
  import("./pages/SignUpPage/SignUpPage")
);
const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

const App=()=> {
 

  return (
    <>
     <Routes>
     <Route path="/" element={<WelcomePage />} />
     <Route path="/singup" element={<SignUpPage />} />
     <Route path ="/singin" element={ <SignInPage />}/>
      <Route path ="/home" element={<HomePage />}/>
      <Route path ="*" element={<NotFoundPage />}/>
      
      </Routes>
    </>
  )
}

export default App;
