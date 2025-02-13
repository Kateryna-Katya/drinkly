import { useEffect } from "react";

const useClickOutside = (ref, onClose) => {
  useEffect(() => {
    if (!ref.current) return;

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
};

export default useClickOutside;
