import NavBar from "Components/common/NavBar";
import React from "react";

const Section = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default Section;
