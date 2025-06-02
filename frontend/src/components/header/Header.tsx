"use client";

import { useState, useEffect } from "react";
import { SideBar2 } from "./HeaderMain";
import SideBar from "./HeaderMobile";

export function Header() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 800);
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return <>{isMobile ? <SideBar /> : <SideBar2 />}</>;
}
