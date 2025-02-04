import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SvgSprite from "./components/SvgSprite/SvgSprite";
import Layout from "./components/Layout/Layout"; // Імпортуємо Layout

const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage"));
const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));

const App = () => {
  return (
    <>
      <SvgSprite />
      <Suspense fallback={<div>.....Loading</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <WelcomePage />
              </Layout>
            }
          />
          <Route
            path="/signup"
            element={
              <Layout>
                <SignUpPage />
              </Layout>
            }
          />
          <Route
            path="/signin"
            element={
              <Layout>
                <SignInPage />
              </Layout>
            }
          />
          <Route
            path="/home"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;