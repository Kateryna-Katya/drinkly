import { Suspense } from "react";
import Header from "../Header/Header";
import css from "./Layout.module.css";
import { useSelector } from "react-redux";
import { selectIsRefreshing } from "../../redux/auth/selectors";
import Loader from "../Loader/Loader";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  const isRefreshing = useSelector(selectIsRefreshing);
  return (
    <>
      <Toaster />
      {isRefreshing ? (
        <Loader />
      ) : (
        <>
          <div className={css.headerContainer}>
            <Header />
          </div>
          <main>
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </main>
        </>
      )}
    </>
  );
};

export default Layout;
