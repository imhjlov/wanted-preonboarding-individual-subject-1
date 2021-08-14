import React from "react";
import LoginButton from "Components/common/Header/LoginButton";
import LogoutButton from "Components/common/Header/LogoutButton";

const UserButton = ({ isLoggedIn }) => {
  return <div>{isLoggedIn ? <LogoutButton /> : <LoginButton />}</div>;
};

export default UserButton;
