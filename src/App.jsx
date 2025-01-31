import {  lazy } from 'react'
import { Route, Routes } from "react-router-dom";
import './App.css'


const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const SignUpPage = lazy(() =>
  import("./pages/SignUpPage/SignUpPage")
);
const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage"));
const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

const App=()=> {
 

  return (
    <>
     <Routes>
     <Route path="/" element={<HomePage />} />
     <Route path="/register" element={<SignUpPage />} />
     <Route path ="/login" element={ <SignInPage />}/>
      <Route path ="/main" element={<MainPage />}/>
      <Route path ="*" element={<NotFoundPage />}/>
      
      </Routes>
    </>
  )
}

export default App;
