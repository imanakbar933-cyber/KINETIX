import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",   // browser ko force karo top pe jane ke liye
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;