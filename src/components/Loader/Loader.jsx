import { ColorRing } from "react-loader-spinner";
import style from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={style.loader}>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperClass="blocks-wrapper"
        colors={["#407BFF", "#9EBBFF", "#D7E3FF", "#407BFF", "#9EBBFF"]}
      />
    </div>
  );
};

export default Loader;
