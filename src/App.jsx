import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SvgSprite from "./components/SvgSprite/SvgSprite";
import Layout from "./components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RestrictedRoute from "./components/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute";
import { currenthUser } from "./redux/auth/operations";
import { selectUserToken } from "./redux/auth/selectors";

const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage"));
const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage/ForgotPasswordPage"));

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectUserToken);

  useEffect(() => {
    if (token) {
      dispatch(currenthUser());
    }
  }, [dispatch, token]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover={false}
        limit={3}
      />
      <SvgSprite />
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <RestrictedRoute redirectTo="/home" component={<WelcomePage />} />
            }
          />
          <Route
            path="/signup"
            element={
              <RestrictedRoute redirectTo="/home" component={<SignUpPage />} />
            }
          />
          <Route
            path="/signin"
            element={
              <RestrictedRoute redirectTo="/home" component={<SignInPage />} />
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute redirectTo="/signin" component={<HomePage />} />
            }
          />
          <Route
            path="/auth/reset-password"
            element={
              <RestrictedRoute
                redirectTo="/signin"
                component={<ForgotPasswordPage />}
              />
            }
          />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
