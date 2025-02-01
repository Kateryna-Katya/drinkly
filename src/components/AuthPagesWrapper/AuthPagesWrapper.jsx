import clsx from "clsx";
import css from "./AuthPagesWrapper.module.css";

const AuthPagesWrapper = ({ children, signin }) => {
  return (
    <div className={clsx(css.background, signin && css.deskBackgroundPosition)}>
      {children}
    </div>
  );
};

export default AuthPagesWrapper;
