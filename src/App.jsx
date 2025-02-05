import { lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SvgSprite from "./components/SvgSprite/SvgSprite";
import Layout from "./components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/auth/selectors";
import RestrictedRoute from "./components/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute";
import { currenthUser } from "./redux/auth/operations";
import Loader from "./components/Loader/Loader";

const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage"));
const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  useEffect(() => {
    dispatch(currenthUser());
  }, [dispatch]);
  return (
    <>
      <SvgSprite />
      {isRefreshing ? (
        <Loader />
      ) : (
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <RestrictedRoute
                  redirectTo="/home"
                  component={<WelcomePage />}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <RestrictedRoute
                  redirectTo="/home"
                  component={<SignUpPage />}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <RestrictedRoute
                  redirectTo="/home"
                  component={<SignInPage />}
                />
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute redirectTo="/signin" component={<HomePage />} />
              }
            />
          </Routes>
        </Layout>
      )}
    </>
  );
};

export default App;
