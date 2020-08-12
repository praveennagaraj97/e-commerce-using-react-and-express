import React, { useState, useEffect } from "react";

import "animate.css";

import TopHeader from "./Header/TopHeader";
import SecondaryHeader from "./Header/SecondaryHeader";
import "../styles/app.scss";
import { navItems } from "../data/navLinks";

export default (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });

    return () =>
      window.removeEventListener("resize", () => {
        setWindowWidth(window.innerWidth);
      });
  });

  return (
    <div>
      <TopHeader windowWidth={windowWidth} />
      <SecondaryHeader navItems={navItems} windowWidth={windowWidth} />
    </div>
  );
};
