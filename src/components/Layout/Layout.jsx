import Header from "../Header/Header";
import css from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <>
           <div className={css.headerContainer}>
        <Header />
      </div>
            <main>{children}</main>
    </>
  );
};

export default Layout;