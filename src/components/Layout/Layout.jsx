import { Suspense } from "react";
import Header from "../Header/Header";
import css from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <>
      <div className={css.headerContainer}>
        <Header />
      </div>
      <main>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </main>
    </>
  );
};

export default Layout;
