import React from "react";
import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <Link to="/login">
      <div>로그인/회원가입</div>
    </Link>
  );
};

export default LoginButton;
