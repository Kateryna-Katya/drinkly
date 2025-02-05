import { lazy, useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SvgSprite from "./components/SvgSprite/SvgSprite";
import Layout from "./components/Layout/Layout"; 
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/auth/selectors";
import RestrictedRoute from "./components/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute";
import { refreshUser } from "./redux/auth/operations";

const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage"));
const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));

const App = () => {
  const dispatch=useDispatch();
  const isRefreshing=useSelector(selectIsRefreshing);
  useEffect(()=>{
    dispatch(refreshUser());
  },[dispatch]);
  return (
    <>
      <SvgSprite />
      {isRefreshing?(
        <div></div>
      ):(<Layout>
        <Routes>
          <Route
            path="/"
            element={
              <WelcomePage />
               }
          />
          <Route
            path="/signup"
            element={
             <RestrictedRoute
             restrictedTo="/home"
              component={<SignUpPage />}  
             />
            }
          />
          <Route
            path="/signin"
            element={
              <RestrictedRoute
              restrictedTo="/home"
               component={<SignInPage />}
                
             />
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute
              restrictedTo="/signin"
              component={ <HomePage />}
               
             />
            }
          />
        </Routes>
       </Layout>
          )}
    </>
  );
};

export default App;